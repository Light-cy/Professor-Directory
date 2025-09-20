# Professor Directory API

A REST API backend for the Professor Directory Website built with Node.js, Express, and MySQL.

## 📁 Project Structure

```
server/
├── src/
│   ├── controllers/     # Request handlers
│   ├── routes/         # API route definitions
│   ├── services/       # Business logic
│   ├── models/         # Database models
│   ├── db/            # Database connection and schema
│   └── index.js       # Main server file
├── package.json       # Dependencies and scripts
├── .env              # Environment variables
└── README.md         # This file
```

## 🛠 Technology Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MySQL2** - MySQL database client
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-Origin Resource Sharing
- **Helmet** - Security middleware
- **express-rate-limit** - Rate limiting

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- MySQL 8.0+ installed and running
- npm or yarn package manager

### Installation

1. **Navigate to the server directory:**
   ```bash
   cd server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Edit the `.env` file with your database credentials:
   ```env
   DB_HOST=localhost
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_NAME=professor_directory
   DB_PORT=3306
   ```

4. **Set up the database:**
   ```bash
   # Run the schema file in MySQL
   mysql -u your_username -p < src/db/schema.sql
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```

6. **For production:**
   ```bash
   npm start
   ```

## 📊 API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/admin/login` | Admin login |
| POST | `/api/admin/verify-token` | Verify JWT token |

**Login Request:**
```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Login Response:**
```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "username": "admin",
    "role": "admin"
  }
}
```

### Professors

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/professors` | Get all professors |
| GET | `/api/professors/:id` | Get professor by ID |
| POST | `/api/professors` | Create new professor |
| PUT | `/api/professors/:id` | Update professor |
| DELETE | `/api/professors/:id` | Delete professor |
| GET | `/api/professors/departments` | Get all departments |
| GET | `/api/professors/department/:department` | Get professors by department |

**Query Parameters for GET /api/professors:**
- `search` - Search in name, email, or department
- `department` - Filter by department
- `limit` - Number of results (default: 50)
- `offset` - Offset for pagination (default: 0)

**Professor Object Structure:**
```json
{
  "id": 1,
  "full_name": "Dr. John Smith",
  "department": "Computer Science",
  "office_location": "Turing Hall, Room 314",
  "email": "john.smith@university.edu",
  "profile_image_url": "https://example.com/image.jpg",
  "schedule_monday": "10:00 AM - 12:00 PM (Office Hours)",
  "schedule_tuesday": "2:00 PM - 4:00 PM (Office Hours)",
  "schedule_wednesday": "Not Available",
  "schedule_thursday": "10:00 AM - 12:00 PM (Office Hours)",
  "schedule_friday": "Not Available",
  "schedule_saturday": "Not Available",
  "schedule_sunday": "Not Available",
  "notes": "Available for research consultation by appointment",
  "created_at": "2024-01-15T10:30:00.000Z",
  "updated_at": "2024-01-15T10:30:00.000Z"
}
```

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer your_jwt_token_here
```

## 🗄 Database Schema

The database includes two main tables:

### professors
- `id` - Primary key
- `full_name` - Professor's full name
- `department` - Academic department
- `office_location` - Office location
- `email` - Contact email
- `profile_image_url` - Profile image URL
- `schedule_monday` through `schedule_sunday` - Weekly schedule
- `notes` - Additional notes
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp

### admin_users
- `id` - Primary key
- `username` - Admin username
- `password_hash` - Hashed password
- `created_at` - Creation timestamp

## 🛡 Security Features

- **Rate Limiting**: 100 requests per 15 minutes per IP
- **CORS**: Configured for frontend origin
- **Helmet**: Security headers
- **Input Validation**: Joi validation for requests
- **SQL Injection Protection**: Parameterized queries
- **Error Handling**: Comprehensive error responses

## 📝 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DB_HOST` | MySQL host | localhost |
| `DB_USER` | MySQL username | - |
| `DB_PASSWORD` | MySQL password | - |
| `DB_NAME` | Database name | professor_directory |
| `DB_PORT` | MySQL port | 3306 |
| `PORT` | Server port | 5000 |
| `NODE_ENV` | Environment | development |
| `JWT_SECRET` | JWT secret key | - |
| `ADMIN_USERNAME` | Admin username | admin |
| `ADMIN_PASSWORD` | Admin password | admin123 |
| `FRONTEND_URL` | Frontend URL | http://localhost:5173 |

## 🔧 Development

### Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests (placeholder)

### Database Setup

1. Create MySQL database
2. Run the schema file
3. Update `.env` with your credentials
4. Start the server

### Sample Data

The schema includes a default admin user:
- Username: `admin`
- Password: `admin123`

## 🚀 Deployment

1. Set `NODE_ENV=production` in `.env`
2. Update `JWT_SECRET` with a secure random string
3. Change default admin credentials
4. Update `FRONTEND_URL` to your production frontend URL
5. Use a process manager like PM2 for production

## 📊 Health Check

Visit `http://localhost:5000/health` to check server status.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For issues and questions:
1. Check the logs in the console
2. Verify database connection
3. Check environment variables
4. Review the API documentation above
