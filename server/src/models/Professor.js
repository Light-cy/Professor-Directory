const { pool } = require('../db/connection');

class Professor {
  // Get all professors with optional filtering
static async getAll({ search = '', department = '', limit = 50, offset = 0 } = {}) {
  try {
    let query = `
      SELECT * FROM professors
      WHERE 1=1
    `;
    const params = [];

    if (search) {
      query += ` AND (full_name LIKE ? OR email LIKE ? OR department LIKE ?)`;
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    if (department) {
      query += ` AND department = ?`;
      params.push(department);
    }

    // ✅ no push for limit/offset
    query += ` ORDER BY full_name LIMIT ${parseInt(limit, 10)} OFFSET ${parseInt(offset, 10)}`;

    const [rows] = await pool.execute(query, params);
    return rows;
  } catch (error) {
    throw new Error(`Error fetching professors: ${error.message}`);
  }
}


  // Get professor by ID
  static async getById(id) {
    try {
      const [rows] = await pool.execute(
        'SELECT * FROM professors WHERE id = ?',
        [id]
      );
      return rows[0] || null;
    } catch (error) {
      throw new Error(`Error fetching professor: ${error.message}`);
    }
  }

  // Create new professor
  static async create(professorData) {
    try {
      const {
        full_name,
        department,
        office_location,
        email,
        profile_image_url,
        schedule_monday,
        schedule_tuesday,
        schedule_wednesday,
        schedule_thursday,
        schedule_friday,
        schedule_saturday,
        schedule_sunday,
        notes
      } = professorData;

      const [result] = await pool.execute(`
        INSERT INTO professors (
          full_name, department, office_location, email, profile_image_url,
          schedule_monday, schedule_tuesday, schedule_wednesday, schedule_thursday,
          schedule_friday, schedule_saturday, schedule_sunday, notes
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        full_name,
        department,
        office_location ?? null,
        email,
        profile_image_url ?? null,
        schedule_monday ?? null,
        schedule_tuesday ?? null,
        schedule_wednesday ?? null,
        schedule_thursday ?? null,
        schedule_friday ?? null,
        schedule_saturday ?? null,
        schedule_sunday ?? null,
        notes ?? null
      ]);

      return result.insertId;
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new Error('A professor with this email already exists.');
      }
      throw new Error(`Error creating professor: ${error.message}`);
    }
  }

  // Update professor
  static async update(id, professorData) {
    try {
      const updateFields = [];
      const params = [];

      Object.entries(professorData).forEach(([key, value]) => {
        if (value !== undefined) {
          updateFields.push(`${key} = ?`);
          params.push(value);
        }
      });

      if (updateFields.length === 0) {
        throw new Error('No fields to update');
      }

      params.push(id);

      const [result] = await pool.execute(`
        UPDATE professors
        SET ${updateFields.join(', ')}, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `, params);

      return result.affectedRows > 0;
    } catch (error) {
      throw new Error(`Error updating professor: ${error.message}`);
    }
  }

  // Delete professor
  static async delete(id) {
    try {
      const [result] = await pool.execute(
        'DELETE FROM professors WHERE id = ?',
        [id]
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error(`Error deleting professor: ${error.message}`);
    }
  }

  // Get professors by department
  static async getByDepartment(department) {
    try {
      const [rows] = await pool.execute(
        'SELECT * FROM professors WHERE department = ? ORDER BY full_name',
        [department]
      );
      return rows;
    } catch (error) {
      throw new Error(`Error fetching professors by department: ${error.message}`);
    }
  }

  // Get all unique departments
  static async getDepartments() {
    try {
      const [rows] = await pool.execute(
        'SELECT DISTINCT department FROM professors ORDER BY department'
      );
      return rows.map(row => row.department);
    } catch (error) {
      throw new Error(`Error fetching departments: ${error.message}`);
    }
  }
}

module.exports = Professor;
