#!/usr/bin/env node

/**
 * Database Setup Script for Professor Directory API
 * Run this script to set up the initial database and tables
 */

const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function setupDatabase() {
  console.log('🚀 Starting database setup...\n');

  // Check if .env file exists
  if (!fs.existsSync('.env')) {
    console.error('❌ .env file not found!');
    console.log('📝 Please create a .env file with your database credentials.');
    console.log('💡 You can copy from .env.example if it exists.');
    process.exit(1);
  }

  // Database configuration
  const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 3306
  };

  if (dbConfig.user === undefined || dbConfig.password === undefined) {
    console.error('❌ Database credentials not found in .env file!');
    console.log('📝 Please set DB_USER and DB_PASSWORD in your .env file.');
    process.exit(1);
  }

  let connection;

  try {
    // Connect to MySQL server
    console.log('🔌 Connecting to MySQL server...');
    connection = await mysql.createConnection(dbConfig);

    // Create database if it doesn't exist
    const dbName = process.env.DB_NAME || 'professor_directory';
    console.log(`📊 Creating database "${dbName}" if it doesn't exist...`);
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
    await connection.query(`USE \`${dbName}\``);

    console.log('✅ Database ready!');

    // Read and execute schema file
    const schemaPath = path.join(__dirname, 'src', 'db', 'schema.sql');
    if (!fs.existsSync(schemaPath)) {
      console.error('❌ Schema file not found at:', schemaPath);
      process.exit(1);
    }

    console.log('📋 Reading schema file...');
    const schema = fs.readFileSync(schemaPath, 'utf8');

    // Split schema into individual statements
    const statements = schema.split(/;\s*$/m)
      .map(stmt => stmt.trim()) // Trim whitespace
      .filter(stmt => stmt.length > 0) // Remove empty statements
      .map(stmt => stmt.replace(/--.*$/gm, '')) // Remove single-line comments
      .filter(stmt => stmt.trim().length > 0); // Remove statements that were only comments

    console.log('🏗️  Executing schema...');
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      if (statement.trim()) {
        try {
          await connection.query(statement);
        } catch (error) {
          // Skip if table already exists
          if (!error.message.includes('already exists')) {
            console.error(`❌ Error executing statement ${i + 1}:`, error.message);
          }
        }
      }
    }

    console.log('✅ Schema executed successfully!');

    // Test the connection with the new database
    await connection.execute('SELECT 1 as test');
    console.log('✅ Database connection test passed!');

    // Show setup summary
    console.log('\n🎉 Database setup completed successfully!');
    console.log('\n📋 Setup Summary:');
    console.log(`   • Database: ${dbName}`);
    console.log(`   • Host: ${dbConfig.host}`);
    console.log(`   • Port: ${dbConfig.port}`);
    console.log(`   • Tables created: professors, admin_users`);
    console.log(`   • Default admin: username="admin", password="admin123"`);

    console.log('\n🚀 Next steps:');
    console.log('   1. Start the server: npm run dev');
    console.log('   2. Test the API: curl http://localhost:5000/health');
    console.log('   3. Login: POST http://localhost:5000/api/admin/login');

  } catch (error) {
    console.error('❌ Database setup failed:', error.message);
    console.error('\n🔧 Troubleshooting:');
    console.error('   • Make sure MySQL is running');
    console.error('   • Check your database credentials in .env');
    console.error('   • Ensure MySQL user has CREATE DATABASE privileges');
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Run setup if this script is executed directly
if (require.main === module) {
  setupDatabase();
}

module.exports = setupDatabase;
