const express = require('express')
const router = express.Router()
const multer = require('multer')
const certinumber = require('randomstring')
const Blockchain = require('../blockchain')
const certificatechain = require('../certificatechain')
const User = require('../Models/userSchema')
const Certi = require('../Models/certi')

const upload = multer({ storage: multer.memoryStorage() })

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
        certificate.getLastBlock().certiData = certi.details
      })
    }
  })
  .catch((err) => {
    console.log('Error in updating Certificate chain', err)
  })

/* GET users listing. */
router.get('/:_id', async function (req, res, next) {
  try {
    const { _id } = req.params
    const user = await User.findOne({ _id })
    res.send(user)
  } catch (error) {
    next(error)
  }
})

router.post('/signup', (req, res) => {
  const { username, password } = req.body
  console.log(username, password, ' : signup')
  User.findOne({ username })
    .then(async (user) => {
      if (user) {
        return res.send({
          certificateNumber: 0,
          status: 'User Already Exists',
        })
      } else {
        account.createNewAccount(username, password)

        const blockdata = account.pendingaccount[0]

        try {
          const prehash = account.getLastBlock()['hash']

          const nonce = await account.proofOfWork(prehash, blockdata)

          const hash = await account.hashBlock(nonce, prehash, blockdata)

          const block = await account.createNewBlock(nonce, prehash, hash)

          const newUser = new User({
            username: block.username,
            hash: block.hash,
            nonce: block.nonce,
            prehash: block.prehash,
            blockindex: block.index,
          })

          console.log(account)
          newUser
            .save()
            .then((user) => {
              if (user) {
                return res.send({
                  certificateNumber: 0,
                  status: 'created',
                })
              } else {
                account.chain.pop()
                return res.send({
                  certificateNumber: 0,
                  status: 'no user created try again',
                })
              }
            })
            .catch((err) => {
              account.chain.pop()
              console.log(err)
              res.status(500)
              return res.send({
                certificateNumber: 0,
                status: 'try again!!!',
              })
            })
        } catch (err) {
          console.log(err)
          return res.send({
            certificateNumber: 0,
            status: 'error try again!!!',
          })
        }
      }
    })
    .catch((err) => {
      console.log(err)
      res.status(500)
      return res.send({
        certificateNumber: 0,
        status: 'server down',
      })
    })
})

router.post('/login', (req, res) => {
  const { username, password } = req.body
  console.log(username, password)
  User.findOne({ username })
    .then((user) => {
      if (user) {
        account
          .hashBlock(user.nonce, user.prehash, { username, password })
          .then((hash) => {
            if (user.hash === hash)
              return res.send({
                certificateNumber: 0,
                status: 'logged in',
              })
            else {
              return res.send({
                certificateNumber: 0,
                status: 'Check username or password',
              })
            }
          })
          .catch((err) => {
            console.log(err)
            res.status(500)
            return res.send({
              certificateNumber: 0,
              status: 'server down',
            })
          })
      } else {
        return res.send({
          certificateNumber: 0,
          status: 'no user',
        })
      }
    })
    .catch((err) => {
      res.status(500)
      console.log(err)
      return res.send({
        certificateNumber: 0,
        status: 'server down',
      })
    })
})

router.post(
  '/generatecertificate',
  upload.single('certificate'),
  (req, res) => {
    const certiNo = certinumber.generate({
      length: 8,
      charset: 'numeric',
    })
    const certiData = String(req.file.buffer)

    Certi.findOne({ details: certiData })
      .then(async (certifound) => {
        if (certifound) {
          return res.send({
            certificateNumber: certifound.certinumber,
            status: 'Certificate Number Has been generated Already',
          })
        } else {
          certificate.createNewcertificate(certiNo, certiData)
          const blockdata = certificate.pendingcertificate[0].block

          try {
            const prehash = certificate.getLastBlock()['hash']

            const nonce = await certificate.proofOfWork(prehash, blockdata)

            const hash = await certificate.hashBlock(nonce, prehash, blockdata)

            const block = await certificate.createNewBlock(
              nonce,
              prehash,
              hash
            )

            const newCerti = new Certi({
              certinumber: block.certificate.certiNo,
              details: block.certificate.certiData,
              hash: block.hash,
              nonce: block.nonce,
              prehash: block.prehash,
              blockindex: block.index,
            })
            newCerti
              .save()
              .then((certi) => {
                if (certi) {
                  return res.send({
                    certificateNumber: certi.certinumber,
                    status: 'Generated Successfully',
                  })
                } else {
                  certificate.chain.pop()
                  return res.send({
                    certificateNumber: 0,
                    status:
                      'Certificate Number generation unsuccessful created try again',
                  })
                }
              })
              .catch((err) => {
                res.status(500)
                certificate.chain.pop()
                console.log('err', err)
                return res.send({
                  certificateNumber: 0,
                  status: 'try again!!!',
                })
              })
          } catch (err) {
            console.log(err)
            return res.send({
              certificateNumber: 0,
              status: 'error try again!!!',
            })
          }
        }
      })
      .catch((err) => {
        console.log(err)
        res.status(500)
        return res.send({
          certificateNumber: 0,
          status: 'server down',
        })
      })
  }
)

router.post('/verifycertificate', upload.single('certificate'), (req, res) => {
  const certinumber = req.body.certinumber
  const certiData = String(req.file.buffer)
  Certi.findOne({ certinumber })
    .then(async (certifound) => {
      if (certifound) {
        if (certifound.details === certiData) {
          return res.send({
            certificateNumber: 0,
            status: 'Certificate is Geniune',
          })
        } else {
          return res.send({
            certificateNumber: 0,
            status: 'Certificate is tempered',
          })
        }
      } else {
        return res.send({
          certificateNumber: 0,
          status: 'Certificate is not generated from us',
        })
      }
    })
    .catch((err) => {
      console.log(err)
      return res.send({
        certificateNumber: 0,
        status: 'server down',
      })
    })
})
module.exports = router
