const { generateCertPdf } = require('../utils')
const express = require('express')
const router = express.Router()
const multer = require('multer')
const certinumber = require('randomstring')
const Blockchain = require('../blockchain')
const certificatechain = require('../certificatechain')
const User = require('../Models/userSchema')
const School = require('../Models/schoolSchema')
const CertiRequest = require('../Models/certiRequestSchema')
const Certi = require('../Models/certi')
const sha256 = require('sha256')
const fs = require('fs')
const path = require('path')

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

router.get('/account-chain', async function (req, res, next) {
  try {
    res.send(account.chain)
  } catch (error) {
    next(error)
  }
})
router.get('/certificate-chain', async function (req, res, next) {
  try {
    res.send(certificate.chain)
  } catch (error) {
    next(error)
  }
})

/* GET users listing. */
router.get('/user/list', async function (req, res, next) {
  try {
    const users = await User.find({}).sort({ createdAt: -1 }).select('-password').lean()
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

router.get('/user/:_id/get-data-update-cources/', async function (req, res, next) {
  try {
    const schools = await School.find({}).lean()
    const { _id } = req.params
    const joinedCources = []
    for (const schoolObj of schools) {
      const joinedCourceIds = (schoolObj.cources || []).reduce((resultArr, courceObj) => {
        if ((courceObj.students || []).includes(String(_id))) {
          resultArr.push(String(courceObj._id))
        }
        return resultArr
      }, [])
      if (joinedCourceIds.length) {
        joinedCources.push({
          schoolId: String(schoolObj._id),
          courceIds: joinedCourceIds
        })
      }
    }
    res.send({
      joinedCources,
      schools
    })
  } catch (error) {
    next(error)
  }
})
router.post('/user/update-cources', async (req, res, next) => {
  try {
    const {
      userId,
      data,
      oldJoined
    } = req.body
    const user = await User.findOne({ _id: userId }).select('-password').lean()
    if (!user) {
      res.status(404)
      return res.send({
        status: 'User not found',
      })
    }
    const schools = await School.find({}).lean()
    //reset
    for (const itemObj of (oldJoined || [])) {
      const { schoolId, courceIds = [] } = itemObj || {}
      const schoolObj = schools.find(e => String(e._id) === schoolId)
      
      if (!schoolObj) {
        res.status(404)
        return res.send({
          status: 'School not found',
        })
      }
      for (const courceId of courceIds) {
        const courceObj = (schoolObj.cources || []).find(e => String(e._id) === courceId)
        if (courceObj) {
          const studentIndex = (courceObj.students || []).findIndex(id => String(id) === userId)
          if (studentIndex !== -1) {
            courceObj.students.splice(studentIndex, 1)
          }
        }
      }
      await School.findByIdAndUpdate(schoolObj._id, {
        cources: schoolObj.cources
      })
    }
    //pick again
    for (const itemObj of (data || [])) {
      const { schoolId, courceIds = [] } = itemObj || {}
      const schoolObj = schools.find(e => String(e._id) === schoolId)
      if (!schoolObj) {
        res.status(404)
        return res.send({
          status: 'School not found',
        })
      }
      for (const courceId of courceIds) {
        const courceObj = (schoolObj.cources || []).find(e => String(e._id) === courceId)
        if (courceObj) {
          courceObj.students = courceObj.students || []
          courceObj.students.push(userId)
        }
      }
      await School.findByIdAndUpdate(schoolObj._id, {
        cources: schoolObj.cources
      })
    }
    return res.send({
      success: true
    })
  } catch (err) {
    console.log(err)
    return res.send({
      status: 'error try again!!!',
    })
  }
})
router.post('/user/create', (req, res, next) => {
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

          const passwordEncrypted = sha256(password)

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
            password: passwordEncrypted
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
      password,
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
    const updateData = {
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
    }
    if (password) {
      const passwordEncrypted = sha256(password)
      if (user.password !== passwordEncrypted) {
        updateData.password = passwordEncrypted
      }
    }
    await User.findByIdAndUpdate(_id, updateData)
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
              const passwordEncrypted = sha256(password)
              if (passwordEncrypted === user.password) {
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
    const schools = await School.find({}).sort({ createdAt: -1 }).select('-password').lean()
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
    const { userId } = req.query
    const queryOptions = {}
    if (userId) {
      queryOptions.userId = userId
    }
    const certs = await Certi
      .find(queryOptions)
      .populate([{
        path: 'userId'
      }, {
        path: 'schoolId'
      }])
      .sort({ createdAt: -1 })
      .lean()
    res.send(certs)
  } catch (error) {
    next(error)
  }
})

router.get('/exec-query-test', async function (req, res, next) {
  try {
    const certs = await Certi.find({})
    for (const cert of certs) {
      await Certi.findByIdAndRemove(cert._id)
    }
    res.send({
      success: true
    })
  } catch (error) {
    console.log('error', error)
    next(error)
  }
})
router.get('/certificate/get-data-create', async function (req, res, next) {
  try {
    const certs = await Certi.find({}).lean()
    const users = await User.find({ status: 'active' }).lean()
    const schools = await School.find({ status: 'active' }).lean()
    const countSchoolCources = schools.reduce((total, schoolObj) => {
      total += (schoolObj.cources || []).length
      return total
    }, 0)
    for (const userObj of users) {
      const userCertSchoolCourceIds = certs.reduce((resultArr, certObj) => {
        if (String(certObj.userId) === String(userObj._id)) {
          resultArr.push(`${certObj.schoolId}-${certObj.courceId}`)
        }
        return resultArr
      }, [])
      if (userCertSchoolCourceIds.length === countSchoolCources) {
        userObj.disabled = true
      }
      userObj.dropdownSchools = JSON.parse(JSON.stringify(schools)).reduce((resultArr, schoolObj) => {
        let countDisableCources = 0
        schoolObj.cources = (schoolObj.cources || []).reduce((_resultArr, courceObj) => {
          if ((courceObj.students || []).includes(String(userObj._id))) {
            if (userCertSchoolCourceIds.includes(`${schoolObj._id}-${courceObj._id}`)) {
              courceObj.disable = true
              courceObj.name = `${courceObj.name} (passed)`
              countDisableCources++
            }
            _resultArr.push(courceObj)
          }
          return _resultArr
        }, [])
        if (schoolObj.cources.length) {
          if (countDisableCources === schoolObj.cources.length) {
            schoolObj.disabled = true
            schoolObj.name = `${schoolObj.name} (all passed)`
          }
          resultArr.push(schoolObj)
        }
        return resultArr
      }, [])
    }
    res.send({
      users,
      schools
    })
  } catch (error) {
    next(error)
  }
})
const generateCertificate = async (data = {}) => {
  const certiNo = certinumber.generate({
    length: 8,
    charset: 'numeric',
  })

  const {
    userId,
    schoolId,
    courceId
  } = data

  const user = await User.findById(userId).lean()
  if (!user) {
    return {
      error: true,
      statusCode: 404,
      data: {
        status: 'User not found',
      }
    }
  }
  const school = await School.findById(schoolId).lean()
  if (!school) {
    return {
      error: true,
      statusCode: 404,
      data: {
        status: 'School not found',
      }
    }
  }
  const cource = (school.cources || []).find(e => String(e._id) === String(courceId))
  if (!cource) {
    return {
      error: true,
      statusCode: 404,
      data: {
        status: 'Cource not found',
      }
    }
  }
  if (!(cource.students || []).includes(userId)) {
    return {
      error: true,
      statusCode: 404,
      data: {
        status: 'Student not join this Cource'
      }
    }
  }
  const certiData = {
    userId,
    schoolId,
    courceId
  }

  const certifound = await Certi.findOne(certiData)
  if (certifound) {
    return {
      data: {
        error: true,
        certificateNumber: certifound.certinumber,
        status: 'Certificate Number Has been generated Already',
      }
    }
  }
  const certSrc = await generateCertPdf({ user, school, cource })
  certiData.certSrc = certSrc
  certificate.addPendingCertificate(certiNo, certiData)
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
    return {
      data: {
        status:
          'Certificate Number generation unsuccessful created try again',
      }
    }
  }
  return {
    data: {
      certificateNumber: certi.certinumber,
      status: 'Generated Successfully',
    }
  }
}
router.post('/certificate/create', async (req, res) => {
  try {
    const {
      userId,
      schoolId,
      courceId,
      isGenerateForCource
    } = req.body
    if (isGenerateForCource) {
      const school = await School.findOne({ _id: schoolId })
      if (!school) {
        return res.send({
          status: 'School not found',
        })
      }
      const cource = (school.cources || []).find(e => String(e._id) === courceId)
      if (!cource) {
        return res.send({
          status: 'Cource not found',
        })
      }
      for (const studentId of (cource.students || [])) {
        const generateResult = await generateCertificate({
          userId: studentId,
          schoolId,
          courceId
        })
        const { error, data, statusCode } = generateResult
        if (error && data?.status !== 'Certificate Number Has been generated Already') {
          res.status(statusCode)
          return res.send(data)
        }
      }
    } else {
      const generateResult = await generateCertificate({
        userId,
        schoolId,
        courceId
      })
      const { error, data, statusCode } = generateResult
      if (error) {
        res.status(statusCode)
        return res.send(data)
      }
    }
    return res.send({
      success: true
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

router.post('/certificate/verify', uploadPdf.single('certificateFile'), async (req, res) => {
  try {
    const certinumber = req.body.certinumber
    const certiData = req.file.buffer.toString()
    const certifound = await Certi.findOne({ certinumber })
    if (!certifound || (certifound && !certifound.certSrc)) {
      return res.send({
        status: 'Certificate is not generated from us',
      })
    }
    if (certifound.status === 'archived') {
      return res.send({
        status: 'This Certificate has been ARCHIVED!',
      })
    }

    const fileName = path.basename(certifound.certSrc)
    const certBuf = fs.readFileSync(`./public/certs/${fileName}`).toString()
    
    if (!certificate.isValidBlock(certiData.prehash, certiData.hash)) {
      return res.send({
        status: 'This block is not valid',
      })
    }

    if (certBuf !== certiData) {
      return res.send({
        status: 'Certificate file has been MODIFIED!',
      })
    }
    return res.send({
      valid: true,
      status: 'This Certificate is Genuine',
    })
  } catch (error) {
    return res.send({
      status: 'server down',
    })
  }
})


// CertiRequest
router.get('/certiRequest/list', async function (req, res, next) {
  try {
    const { userId } = req.query
    const queryOptions = {}
    if (userId) {
      queryOptions.userId = userId
    }
    const certiRequests = await CertiRequest
      .find(queryOptions)
      .populate([{
        path: 'userId'
      }, {
        path: 'schoolId'
      }])
      .sort({ createdAt: -1 })
      .lean()
    res.send(certiRequests)
  } catch (error) {
    next(error)
  }
})

router.post('/certiRequest/save', async (req, res, next) => {
  try {
    const {
      _id,
      data
    } = req.body
    if (_id) {
      const certiRequest = await CertiRequest.findOne({ _id })
      if (!certiRequest) {
        return res.send({
          status: 'CertiRequest not found',
        })
      }
      await CertiRequest.findByIdAndUpdate(_id, data)
    } else {
      await CertiRequest.create(data)
    }
    return res.send({
      success: true
    })
  } catch (error) {
    console.log('error', error)
    res.status(500)
    return res.send({
      status: 'server down',
    })
  }
})

router.post('/certiRequest/:_id/change-status', async (req, res) => {
  try {
    const { _id } = req.params
    const { status } = req.body
    const certiRequestObj = await CertiRequest.findById(_id)
    if (!certiRequestObj) {
      res.status(404)
      return res.send({
        status: 'request not found'
      })
    }
    if (status === 'approved') {
      const generateResult = await generateCertificate({
        userId: certiRequestObj.userId,
        schoolId: certiRequestObj.schoolId,
        courceId: certiRequestObj.courceId
      })
      const { error, data, statusCode } = generateResult
      if (error) {
        res.status(statusCode)
        return res.send(data)
      }
    }
    await CertiRequest.findByIdAndUpdate(_id, {
      status
    })
    return res.send({
      success: true
    })
  } catch (error) {
    console.log('error', error)
    res.status(500)
    return res.send({
      status: 'server down',
    })
  }
})

module.exports = router
