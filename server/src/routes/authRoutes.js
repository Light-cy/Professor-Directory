const express = require('express');
const AuthController = require('../controllers/authController');

const router = express.Router();

// POST /api/admin/login
router.post('/login', AuthController.login);

// POST /api/admin/verify-token
router.post('/verify-token', AuthController.verifyToken);

module.exports = router;
