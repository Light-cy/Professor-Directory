const AuthService = require('../services/authService');

class AuthController {
  // Admin login endpoint
  static async login(req, res) {
    try {
      const { username, password } = req.body;

      // Validate input
      if (!username || !password) {
        return res.status(400).json({
          success: false,
          message: 'Username and password are required'
        });
      }

      const result = await AuthService.authenticateAdmin(username, password);

      if (result.success) {
        res.json({
          success: true,
          message: 'Login successful',
          token: result.token,
          user: result.user
        });
      } else {
        res.status(401).json({
          success: false,
          message: result.message
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  // Verify token endpoint
  static async verifyToken(req, res) {
    try {
      const { token } = req.body;

      if (!token) {
        return res.status(400).json({
          success: false,
          message: 'Token is required'
        });
      }

      const result = AuthService.verifyToken(token);

      if (result.valid) {
        res.json({
          success: true,
          message: 'Token is valid',
          user: result.decoded
        });
      } else {
        res.status(401).json({
          success: false,
          message: 'Invalid token',
          error: result.error
        });
      }
    } catch (error) {
      console.error('Token verification error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }
}

module.exports = AuthController;
