const express = require('express');
const ProfessorController = require('../controllers/professorController');

const router = express.Router();

// GET /api/professors - Get all professors with optional filtering
router.get('/', ProfessorController.getAllProfessors);

// GET /api/professors/departments - Get all departments
router.get('/departments', ProfessorController.getDepartments);

// GET /api/professors/department/:department - Get professors by department
router.get('/department/:department', ProfessorController.getProfessorsByDepartment);

// GET /api/professors/:id - Get professor by ID
router.get('/:id', ProfessorController.getProfessorById);

// POST /api/professors - Create new professor
router.post('/', ProfessorController.createProfessor);

// PUT /api/professors/:id - Update professor
router.put('/:id', ProfessorController.updateProfessor);

// DELETE /api/professors/:id - Delete professor
router.delete('/:id', ProfessorController.deleteProfessor);

module.exports = router;
