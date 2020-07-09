const router = require('express').Router()
const movieController = require('../controller/Movie')
const uploadSetting = require('../uploadConfig')
const { json } = require('express')
const fields = uploadSetting.upload.fields([
    {
      name: 'image',
      maxCount: 1
    }
])

// input
router.post('/insert', fields, (req, res) => {
    const imageName = uploadSetting.cekNull(req.files['image'])
    const data = Object.assign(JSON.parse(req.body.data), {
      image: imageName
    })
    movieController.insertMovie(data)
      .then((result) => res.json(result))
      .catch((err) => res.json(err))
  })

// tampil
router.get('/getall', (req, res) => {
    movieController.getallMovie()
      .then((result) => res.json(result))
      .catch((err) => res.json(err))
  })
  router.get('/getbyid/:id', (req, res) => {
    movieController.getbyId(req.params.id)
      .then(result => res.json(result))
      .catch((err) => res.json(err))
  })

// edit
router.put('/edit/:id', fields,(req, res) => {
    const imageName = uploadSetting.cekNull(req.files['image'])
    let data = JSON.parse(req.body.data)
    let changeImage = false
    if (imageName) {
        changeImage = true
        data = Object.assign(data, {
            image: imageName,
            oldImage: data.image
        })
    }

    movieController.edit(data, req.params.id, changeImage)
        .then(result => res.json(result))
        .catch(err => res.json(err))
  })

  // delete
  router.delete('/delete/:id', (req, res) => {
    movieController.delete(req.params.id)
      .then(result => res.json(result))
      .catch(err => res.json(err))
  })

module.exports = router