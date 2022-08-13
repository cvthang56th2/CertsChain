const { generateCertPdf } = require('../utils')
const express = require('express')
const router = express.Router()
const multer = require('multer')
const certinumber = require('randomstring')
const Blockchain = require('../blockchain')
const certificatechain = require('../certificatechain')
const User = require('../Models/userSchema')
const School = require('../Models/schoolSchema')
const Certi = require('../Models/certi')
const sha256 = require('sha256')
const fs = require('fs')

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (!allowedTypes.includes(file.mimetype)) {
    const error = new Error("Incorrect file");
    error.code = "INCORRECT_FILETYPE";
    return cb(error, false)
  }
  cb(null, true);
}

const avatarDirPath = './public/avatar'

if (!fs.existsSync(avatarDirPath)){
  fs.mkdirSync(avatarDirPath);
}

const uploadAvatar = multer({
  storage: multer.diskStorage({
    fileFilter,
    destination: (req, file, callback) => {
      callback(null, avatarDirPath);
    },
    filename: (req, file, callback) => {
      callback(null, `${new Date().getTime()}-${file.originalname.split(' ').join('_')}`);
    },
    // limits: {
    //   fileSize: 5000000
    // }
  })
});

const uploadPdf = multer({ storage: multer.memoryStorage() })

const account = new Blockchain()
const certificate = new certificatechain()

User.find()
  .sort({ blockindex: 1 })
  .then((users) => {
    if (users.length > 0) {
      users.forEach((user) => {
        account.createNewBlock(user.nonce, user.prehash, user.hash)
        account.getLastBlock().username = user.username
      })
    }
  })
  .catch((err) => {
    console.log('Error in updating Account chain', err)
  })

Certi.find()
  .sort({ blockindex: 1 })
  .then((certis) => {
    if (certis.length > 0) {
      certis.forEach((certi) => {
        certificate.createNewBlock(certi.nonce, certi.prehash, certi.hash)
        certificate.getLastBlock().certiNo = certi.certinumber
        const { userId, schoolId, courceId, certSrc } = certi
        const certiData = { userId, schoolId, courceId, certSrc }
        certificate.getLastBlock().certiData = certiData
      })
    }
  })
  .catch((err) => {
    console.log('Error in updating Certificate chain', err)
  })

/* GET users listing. */
router.get('/user/list', async function (req, res, next) {
  try {
    const users = await User.find({}).select('-password').lean()
    // for (const user of users) {
    //   await User.findByIdAndRemove(user._id)
    // }
    res.send(users)
  } catch (error) {
    next(error)
  }
})

router.get('/user/:_id', async function (req, res, next) {
  try {
    const { _id } = req.params
    const user = await User.findOne({ _id }).select('-password').lean()
    res.send(user)
  } catch (error) {
    next(error)
  }
})

router.post('/user/signup', (req, res, next) => {
  const {
    username,
    password,
    firstName,
    lastName,
    gender,
    contactNo,
    currentAddress,
    permanantAddress,
    email,
    birthday,
  } = req.body
  User.findOne({ username })
    .then(async (user) => {
      if (user) {
        return res.send({
          status: 'User Already Exists',
        })
      } else {
        account.createNewAccount(username)

        const blockdata = account.pendingaccount[0]

        try {
          const prehash = account.getLastBlock()['hash']

          const nonce = await account.proofOfWork(prehash, blockdata)

          const hash = await account.hashBlock(nonce, prehash, blockdata)

          const block = await account.createNewBlock(nonce, prehash, hash)

          const passwordEncypted = sha256(password)

          const newUser = new User({
            username: block.username,
            hash: block.hash,
            nonce: block.nonce,
            prehash: block.prehash,
            blockindex: block.index,
            firstName,
            lastName,
            gender,
            contactNo,
            currentAddress,
            permanantAddress,
            email,
            birthday,
            password: passwordEncypted
          })

          console.log(account)
          newUser
            .save()
            .then((user) => {
              if (user) {
                return res.send({
                  status: 'created',
                })
              } else {
                account.chain.pop()
                return res.send({
                  status: 'no user created try again',
                })
              }
            })
            .catch((err) => {
              account.chain.pop()
              console.log(err)
              res.status(500)
              return res.send({
                status: 'try again!!!',
              })
            })
        } catch (err) {
          console.log(err)
          return res.send({
            status: 'error try again!!!',
          })
        }
      }
    })
    .catch((err) => {
      console.log(err)
      res.status(500)
      return res.send({
        status: 'server down',
      })
    })
})

router.post('/user/:_id/change-status', async (req, res) => {
  try {
    const { _id } = req.params
    const user = await User.findById(_id)
    await User.findByIdAndUpdate(_id, {
      status: user.status === 'archived' ? 'active' : 'archived'
    })
    return res.send({
      success: true
    })
  } catch (error) {
    res.status(500)
    return res.send({
      status: 'server down',
    })
  }
})

router.post('/user/update', async (req, res, next) => {
  try {
    const {
      _id,
      userType,
      firstName,
      lastName,
      gender,
      contactNo,
      currentAddress,
      permanantAddress,
      email,
      birthday,
      description,
      experiences,
      educations,
      status,
    } = req.body
    const user = await User.findOne({ _id })
    if (!user) {
      return res.send({
        status: 'User not found',
      })
    }
    await User.findByIdAndUpdate(_id, {
      userType,
      firstName,
      lastName,
      gender,
      contactNo,
      currentAddress,
      permanantAddress,
      email,
      birthday,
      description,
      experiences,
      educations,
      status,
    })
    return res.send({
      success: true
    })
  } catch (error) {
    res.status(500)
    return res.send({
      status: 'server down',
    })
  }
})


router.post('/user/upload-avatar', uploadAvatar.single('avatarFile'), async (req, res, next) => {
  try {
    const userId = req.body.userId
    const avatarFile = req.file
    if (!avatarFile) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next(error)
    }
    const user = await User.findById(userId)
    if (!user) {
      const error = new Error('User not found')
      error.httpStatusCode = 400
      return next(error)
    }
    if (user.avatar) {
      const oldAvatar = `${avatarDirPath}/${user.avatar}`
      if (fs.existsSync(oldAvatar)) {
        fs.unlinkSync(oldAvatar)
      }
    }

    await User.findByIdAndUpdate(userId, {
      avatar: req.file.filename
    })

    return res.send({
      success: true,
      avatar: req.file.filename
    })
  } catch (error) {
    next(error)
  }
})

router.post('/user/login', (req, res) => {
  const { username, password } = req.body
  User.findOne({ username })
    .then((user) => {
      if (user) {
        account
          .hashBlock(user.nonce, user.prehash, { username })
          .then((hash) => {
            if (user.hash === hash) {
              const passwordEncypted = sha256(password)
              if (passwordEncypted === user.password) {
                for (const key of ['password','hash','blockindex','nonce','prehash']) {
                  delete user[key]
                }
                return res.send({
                  success: true,
                  status: 'logged in',
                  userInfo: user
                })
              } else {
                return res.send({
                  status: 'Check username or password',
                })
              }
            } else {
              return res.send({
                status: 'Check username or password',
              })
            }
          })
          .catch((err) => {
            console.log(err)
            res.status(500)
            return res.send({
              status: 'server down',
            })
          })
      } else {
        return res.send({
          status: 'no user',
        })
      }
    })
    .catch((err) => {
      res.status(500)
      console.log(err)
      return res.send({
        status: 'server down',
      })
    })
})

// schools and cources
router.get('/school/list', async function (req, res, next) {
  try {
    const schools = await School.find({}).select('-password').lean()
    res.send(schools)
  } catch (error) {
    next(error)
  }
})

router.post('/school/save', async (req, res, next) => {
  try {
    const {
      _id,
      data
    } = req.body
    if (_id) {
      const school = await School.findOne({ _id })
      if (!school) {
        return res.send({
          status: 'School not found',
        })
      }
      await School.findByIdAndUpdate(_id, data)
    } else {
      await School.create(data)
    }
    return res.send({
      success: true
    })
  } catch (error) {
    res.status(500)
    return res.send({
      status: 'server down',
    })
  }
})

router.post('/school/:_id/change-status', async (req, res) => {
  try {
    const { _id } = req.params
    const school = await School.findByIdAndUpdate({ _id })
    await School.findByIdAndUpdate(_id, {
      status: school.status === 'archived' ? 'active' : 'archived'
    })
    return res.send({
      success: true
    })
  } catch (error) {
    res.status(500)
    return res.send({
      status: 'server down',
    })
  }
})

// certicifates
router.get('/certificate/list', async function (req, res, next) {
  try {
    const certs = await Certi
      .find({})
      .populate([{
        path: 'userId'
      }, {
        path: 'schoolId'
      }])
      .lean()
    res.send(certs)
  } catch (error) {
    next(error)
  }
})

router.post('/certificate/create', async (req, res) => {
  try {
    const certiNo = certinumber.generate({
      length: 8,
      charset: 'numeric',
    })

    const {
      userId,
      schoolId,
      courceId
    } = req.body

    const user = await User.findById(userId).lean()
    if (!user) {
      res.status(404)
      return res.send({
        status: 'User not found',
      })
    }
    const school = await School.findById(schoolId).lean()
    if (!school) {
      res.status(404)
      return res.send({
        status: 'School not found',
      })
    }
    const cource = (school.cources || []).find(e => String(e._id) === String(courceId))
    if (!cource) {
      res.status(404)
      return res.send({
        status: 'Cource not found',
      })
    }
    const certiData = {
      userId,
      schoolId,
      courceId
    }

    const certifound = await Certi.findOne(certiData)
    if (certifound) {
      return res.send({
        error: true,
        certificateNumber: certifound.certinumber,
        status: 'Certificate Number Has been generated Already',
      })
    }
    const certSrc = await generateCertPdf({ user, school, cource })
    certiData.certSrc = certSrc
    certificate.createNewcertificate(certiNo, certiData)
    const blockdata = certificate.pendingcertificate[0].block
    const prehash = certificate.getLastBlock()['hash']

    const nonce = await certificate.proofOfWork(prehash, blockdata)

    const hash = await certificate.hashBlock(nonce, prehash, blockdata)

    const block = await certificate.createNewBlock(
      nonce,
      prehash,
      hash
    )

    const newCerti = new Certi({
      ...certiData,
      certinumber: block.certificate.certiNo,
      hash: block.hash,
      nonce: block.nonce,
      prehash: block.prehash,
      blockindex: block.index,
    })
    const certi = await newCerti.save()
    if (!certi) {
      certificate.chain.pop()
      return res.send({
        status:
          'Certificate Number generation unsuccessful created try again',
      })
    }
    return res.send({
      certificateNumber: certi.certinumber,
      status: 'Generated Successfully',
    })
  } catch (error) {
    console.log('error', error)
    res.status(500)
    return res.send({
      status: 'server down',
    })
  }
})

router.post('/certificate/update', async (req, res, next) => {
  try {
    const {
      _id,
    } = req.body
    const certi = await Certi.findOne({ _id })
    if (!certi) {
      return res.send({
        status: 'Certi not found',
      })
    }
    await Certi.findByIdAndUpdate(_id, {
      firstName,
      lastName,
      gender,
      contactNo,
      currentAddress,
      permanantAddress,
      email,
      birthday,
    })
    return res.send({
      success: true
    })
  } catch (error) {
    res.status(500)
    return res.send({
      status: 'server down',
    })
  }
})

router.post('/certificate/:_id/change-status', async (req, res) => {
  try {
    const { _id } = req.params
    const certi = await Certi.findById(_id)
    await Certi.findByIdAndUpdate(_id, {
      status: certi.status === 'archived' ? 'active' : 'archived'
    })
    return res.send({
      success: true
    })
  } catch (error) {
    res.status(500)
    return res.send({
      status: 'server down',
    })
  }
})

router.post('/certificate/verify', uploadPdf.single('certificate'), (req, res) => {
  const certinumber = req.body.certinumber
  const certiData = String(req.file.buffer)
  Certi.findOne({ certinumber })
    .then(async (certifound) => {
      if (certifound) {
        if (certifound.details === certiData) {
          return res.send({
            status: 'Certificate is Geniune',
          })
        } else {
          return res.send({
            status: 'Certificate is tempered',
          })
        }
      } else {
        return res.send({
          status: 'Certificate is not generated from us',
        })
      }
    })
    .catch((err) => {
      console.log(err)
      return res.send({
        status: 'server down',
      })
    })
})
module.exports = router
