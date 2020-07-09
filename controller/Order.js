const orderModel = require('../model/Order')
const { requestResponse } = require('../config')
const objectId = require('mongoose').Types.ObjectId

// fungsi orderinput
exports.insert = (data) =>
  new Promise((resolve, reject) => {
    try {  
        orderModel.create(data)
          .then(() => resolve(requestResponse.sukses('Berhasil Order')))
          .catch(() => reject(requestResponse.serverError))
    } catch (error) {
        console.log(error)
    }
  })

// fungsi tampil
exports.getAllOrder = () =>
new Promise((resolve, reject) => {
  orderModel.aggregate([
    {
      $lookup: {
        from: "movies",
        localField: "idFilm",
        foreignField: "_id",
        as: "dataMovie"
      }
    },
    {
      $lookup: {
        from: "users",
        localField: "idUser",
        foreignField: "_id",
        as: "dataUser"
      }
    }
  ]).then(res => {
    resolve(requestResponse.suksesWithData(res))
  }).catch(() => reject(requestResponse.serverError))
})
// lihat order saya
exports.getOrderByUser = (id) =>
new Promise((resolve, reject) => {
  orderModel.aggregate([
    {
      $match: {
        idUser: objectId(id)
      }
    },
    {
      $lookup: {
        from: "movies",
        localField: "idFilm",
        foreignField: "_id",
        as: "dataMovie"
      }
    }
  ]).then(res => {
    resolve(requestResponse.suksesWithData(res))
  }).catch(() => reject(requestResponse.serverError))
})
// konfirmasi order
exports.konfirmasiOrder = (id) =>
  new Promise((resolve, reject) => {
    orderModel.updateOne({
      _id: objectId(id)
    }, {
      status: 2
    }).then(() => resolve(requestResponse.sukses('Berhasil Mengkonfirmasi Order')))
    .catch(() => reject(requestResponse.serverError))
  })

// edit atau terima barang
exports.terimaBarang = (id) =>
  new Promise((resolve, reject) => {
    orderModel.updateOne({
      _id: objectId(id)
    }, {
      status: 3
    }).then(() => resolve(requestResponse.sukses('Berhasil Menerima Order')))
    .catch(() => reject(requestResponse.serverError))
  })