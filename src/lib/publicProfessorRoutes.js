const express = require('express');
const router = express.Router();
const professorController = require('../controllers/professorController');

// Public route for searching professors
// GET /api/professors/search?q=...
router.get('/', professorController.searchPublicProfessors);

module.exports = router;