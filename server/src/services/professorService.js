const Professor = require('../models/Professor');

class ProfessorService {
  // Get all professors with filtering
  static async getAllProfessors(query = {}) {
    try {
      const { search, department, limit = 50, offset = 0 } = query;

      const professors = await Professor.getAll({
        search: search || '',
        department: department || '',
        limit: parseInt(limit),
        offset: parseInt(offset)
      });

      return {
        success: true,
        data: professors,
        count: professors.length
      };
    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  }

  // Get professor by ID
  static async getProfessorById(id) {
    try {
      if (!id) {
        return {
          success: false,
          message: 'Professor ID is required'
        };
      }

      const professor = await Professor.getById(id);

      if (!professor) {
        return {
          success: false,
          message: 'Professor not found'
        };
      }

      return {
        success: true,
        data: professor
      };
    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  }

  // Create new professor
  static async createProfessor(professorData) {
    try {
      // Validate required fields
      const requiredFields = ['full_name', 'department', 'email'];
      const missingFields = requiredFields.filter(field => !professorData[field]);

      if (missingFields.length > 0) {
        return {
          success: false,
          message: `Missing required fields: ${missingFields.join(', ')}`
        };
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(professorData.email)) {
        return {
          success: false,
          message: 'Invalid email format'
        };
      }

      const professorId = await Professor.create(professorData);

      return {
        success: true,
        message: 'Professor created successfully',
        data: { id: professorId }
      };
    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  }

  // Update professor
  static async updateProfessor(id, professorData) {
    try {
      if (!id) {
        return {
          success: false,
          message: 'Professor ID is required'
        };
      }

      // Check if professor exists
      const existingProfessor = await Professor.getById(id);
      if (!existingProfessor) {
        return {
          success: false,
          message: 'Professor not found'
        };
      }

      // Validate email format if provided
      if (professorData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(professorData.email)) {
        return {
          success: false,
          message: 'Invalid email format'
        };
      }

      const updated = await Professor.update(id, professorData);

      if (!updated) {
        return {
          success: false,
          message: 'Failed to update professor'
        };
      }

      return {
        success: true,
        message: 'Professor updated successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  }

  // Delete professor
  static async deleteProfessor(id) {
    try {
      if (!id) {
        return {
          success: false,
          message: 'Professor ID is required'
        };
      }

      // Check if professor exists
      const existingProfessor = await Professor.getById(id);
      if (!existingProfessor) {
        return {
          success: false,
          message: 'Professor not found'
        };
      }

      const deleted = await Professor.delete(id);

      if (!deleted) {
        return {
          success: false,
          message: 'Failed to delete professor'
        };
      }

      return {
        success: true,
        message: 'Professor deleted successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  }

  // Get all departments
  static async getDepartments() {
    try {
      const departments = await Professor.getDepartments();

      return {
        success: true,
        data: departments
      };
    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  }

  // Get professors by department
  static async getProfessorsByDepartment(department) {
    try {
      if (!department) {
        return {
          success: false,
          message: 'Department is required'
        };
      }

      const professors = await Professor.getByDepartment(department);

      return {
        success: true,
        data: professors,
        count: professors.length
      };
    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  }
}

module.exports = ProfessorService;
