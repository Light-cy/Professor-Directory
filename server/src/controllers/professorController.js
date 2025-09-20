const ProfessorService = require('../services/professorService');

class ProfessorController {
  // Get all professors
  static async getAllProfessors(req, res) {
    try {
      const { search, q, department, limit, offset } = req.query;

      const result = await ProfessorService.getAllProfessors({
        search: search || q, // Use 'search' or 'q'
        department,
        limit,
        offset
      });

      if (result.success) {
        res.json({
          success: true,
          data: result.data,
          count: result.count
        });
      } else {
        res.status(400).json({
          success: false,
          message: result.message
        });
      }
    } catch (error) {
      console.error('Get all professors error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  // Get professor by ID
  static async getProfessorById(req, res) {
    try {
      const { id } = req.params;

      const result = await ProfessorService.getProfessorById(id);

      if (result.success) {
        res.json({
          success: true,
          data: result.data
        });
      } else {
        res.status(404).json({
          success: false,
          message: result.message
        });
      }
    } catch (error) {
      console.error('Get professor by ID error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  // Create new professor
  static async createProfessor(req, res) {
    try {
      const professorData = req.body;

      const result = await ProfessorService.createProfessor(professorData);

      if (result.success) {
        res.status(201).json({
          success: true,
          message: result.message,
          data: result.data
        });
      } else {
        res.status(400).json({
          success: false,
          message: result.message
        });
      }
    } catch (error) {
      console.error('Create professor error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  // Update professor
  static async updateProfessor(req, res) {
    try {
      const {
        id
      } = req.params;
      const professorData = req.body;

      const result = await ProfessorService.updateProfessor(id, professorData);

      if (result.success) {
        res.json({
          success: true,
          message: result.message,
          data: result.data
        });
      } else {
        res.status(400).json({
          success: false,
          message: result.message
        });
      }
    } catch (error) {
      console.error('Update professor error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  // Delete professor
  static async deleteProfessor(req, res) {
    try {
      const { id } = req.params;

      const result = await ProfessorService.deleteProfessor(id);

      if (result.success) {
        res.json({
          success: true,
          message: result.message
        });
      } else {
        res.status(400).json({
          success: false,
          message: result.message
        });
      }
    } catch (error) {
      console.error('Delete professor error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  // Get all departments
  static async getDepartments(req, res) {
    try {
      const result = await ProfessorService.getDepartments();

      if (result.success) {
        res.json({
          success: true,
          data: result.data
        });
      } else {
        res.status(400).json({
          success: false,
          message: result.message
        });
      }
    } catch (error) {
      console.error('Get departments error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  // Get professors by department
  static async getProfessorsByDepartment(req, res) {
    try {
      const { department } = req.params;

      const result = await ProfessorService.getProfessorsByDepartment(department);

      if (result.success) {
        res.json({
          success: true,
          data: result.data,
          count: result.count
        });
      } else {
        res.status(400).json({
          success: false,
          message: result.message
        });
      }
    } catch (error) {
      console.error('Get professors by department error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }
}

module.exports = ProfessorController;
