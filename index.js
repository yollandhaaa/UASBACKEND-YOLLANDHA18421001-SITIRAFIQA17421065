const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')

const mongoURL = 'mongodb://localhost:27017/tokobajufiqyol'
mongoose.connect(mongoURL, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('berhasil connect ke database')
}).catch(() => {
  console.log('gagal connect ke database')
})

const directory = path.join(__dirname, '/statics/')
app.use(express.static(directory))
app.use(cors())

app.use(bodyParser.json({
  extended: true,
  limit: '20mb'
}))

app.use(bodyParser.urlencoded({
  extended: true,
  limit: '20mb'
}))
// list route

app.use('/user', require('./routes/User'))
app.use('/baju', require('./routes/Movie'))
app.use('/order', require('./routes/Order'))

app.listen(5000, () => {
  console.log('server telah dijalankan di port 5000 sipsipsippp')
})