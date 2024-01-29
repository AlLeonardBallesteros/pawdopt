const mongoose = require('mongoose');

const userGallerySchema = new mongoose.Schema({
  imageUrl: String,
  caption: String,
  breed: String,
  gender: String,
  age: String,
  medhistory: String,

});

const UserGallery = mongoose.model('UserGallery', userGallerySchema);

module.exports = UserGallery;
