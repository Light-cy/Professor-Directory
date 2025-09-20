const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { pool } = require('../db/connection');
require('dotenv').config();

class AuthService {
  // Verify admin credentials
  static async authenticateAdmin(username, password) {
    try {
      // For demo purposes, use environment variables
      // In production, this should be stored in database
      const adminUsername = process.env.ADMIN_USERNAME || 'admin';
      const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

      if (username === adminUsername && password === adminPassword) {
        // Generate JWT token
        const token = jwt.sign(
          { username: adminUsername, role: 'admin' },
          process.env.JWT_SECRET || 'your_super_secret_jwt_key_here_change_in_production',
          { expiresIn: '24h' }
        );

        return {
          success: true,
          token,
          user: { username: adminUsername, role: 'admin' }
        };
      }

      return { success: false, message: 'Invalid credentials' };
    } catch (error) {
      throw new Error(`Authentication error: ${error.message}`);
    }
  }

  // Verify JWT token
  static verifyToken(token) {
    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'your_super_secret_jwt_key_here_change_in_production'
      );
      return { valid: true, decoded };
    } catch (error) {
      return { valid: false, error: error.message };
    }
  }

  // Hash password (for future database implementation)
  static async hashPassword(password) {
    try {
      const saltRounds = 10;
      return await bcrypt.hash(password, saltRounds);
    } catch (error) {
      throw new Error(`Error hashing password: ${error.message}`);
    }
  }

  // Verify password (for future database implementation)
  static async verifyPassword(password, hashedPassword) {
    try {
      return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
      throw new Error(`Error verifying password: ${error.message}`);
    }
  }
}

module.exports = AuthService;
