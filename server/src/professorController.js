const Professor = require('../models/Professor');

exports.getAllProfessors = async (req, res, next) => {
  try {
    const { search, department, limit, offset } = req.query;
    const professors = await Professor.getAll({
      search,
      department,
      limit: parseInt(limit) || 50,
      offset: parseInt(offset) || 0
    });
    res.json(professors);
  } catch (error) {
    next(error);
  }
};

exports.searchPublicProfessors = async (req, res, next) => {
  try {
    const { q, department, limit, offset } = req.query;
    const professors = await Professor.getAll({
      search: q,
      department,
      limit: parseInt(limit) || 50,
      offset: parseInt(offset) || 0
    });
    res.json(professors);
  } catch (error) {
    next(error);
  }
};

exports.getProfessorById = async (req, res, next) => {
  try {
    const professor = await Professor.getById(req.params.id);
    if (!professor) {
      return res.status(404).json({ success: false, message: 'Professor not found' });
    }
    res.json(professor);
  } catch (error) {
    next(error);
  }
};

exports.createProfessor = async (req, res, next) => {
  try {
    const professorId = await Professor.create(req.body);
    const newProfessor = await Professor.getById(professorId);
    res.status(201).json(newProfessor);
  } catch (error) {
    next(error);
  }
};

exports.updateProfessor = async (req, res, next) => {
  try {
    const success = await Professor.update(req.params.id, req.body);
    res.json({ success });
  } catch (error) {
    next(error);
  }
};

exports.deleteProfessor = async (req, res, next) => {
  try {
    await Professor.delete(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};