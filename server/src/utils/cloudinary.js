const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'djll7cett',
  api_key: '923936666563976',
  api_secret: '9bVbuHZdLG5PsWsnZcU98VP9QRA'
});

module.exports = cloudinary;