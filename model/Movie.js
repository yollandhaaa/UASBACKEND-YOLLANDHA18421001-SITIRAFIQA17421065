const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MovieSchema = new Schema({
  namaBaju: {
    type: String
  },
  harga: {
    type: Number
  },
  warna: {
    type: String,
  },
  ukuran: {
    type: String    
  },
  rating: {
    type: Number,
    default: 0
  },
  deskripsi: {
    type: String
  },
  image: {
    type: String
  }
})

module.exports = mongoose.model('movie', MovieSchema)
