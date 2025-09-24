const express = require('express');
const multer = require('multer');
const cloudinary = require('../utils/cloudinary');
const fs = require('fs');
const router = express.Router();

// Multer setup for temporary file storage
const upload = multer({ dest: 'uploads/' });

// POST /api/images/upload
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'professors'
    });
    // Remove temp file after upload
    fs.unlinkSync(req.file.path);
    // Return the Cloudinary image URL
    res.json({ success: true, url: result.secure_url });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
