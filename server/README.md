# Taskify Server - MERN Stack Backend

A well-structured Node.js/Express backend for the Taskify todo list application, following MVC architecture patterns.

## Project Structure

```
server/
├── src/
│   ├── config/
│   │   └── database.js          # Database connection configuration
│   ├── controllers/
│   │   ├── authController.js   # Authentication logic
│   │   └── taskController.js   # Task management logic
│   ├── middleware/
│   │   └── auth.js             # JWT authentication middleware
│   ├── models/
│   │   ├── User.js             # User schema and model
│   │   └── Task.js             # Task schema and model
│   ├── routes/
│   │   ├── auth.js             # Authentication routes
│   │   └── tasks.js            # Task management routes
│   └── index.js                # Main server file
├── package.json
└── .env                        # Environment variables (create this)
```

## Architecture Overview

### Models (`/models`)
- **User.js**: User schema with username, email, password, and timestamps
- **Task.js**: Task schema with title, description, priority, due date, completion status, and user reference

### Controllers (`/controllers`)
- **authController.js**: Handles user registration, login, and profile management
- **taskController.js**: Manages task CRUD operations and completion toggling

### Routes (`/routes`)
- **auth.js**: Authentication endpoints (`/api/auth/*`)
- **tasks.js**: Task management endpoints (`/api/tasks/*`)

### Middleware (`/middleware`)
- **auth.js**: JWT token verification for protected routes

### Configuration (`/config`)
- **database.js**: MongoDB connection setup with error handling

## Environment Variables

Create a `.env` file in the server directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskify
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (protected)

### Tasks
- `GET /api/tasks` - Get all user tasks (protected)
- `POST /api/tasks` - Create new task (protected)
- `GET /api/tasks/:id` - Get single task (protected)
- `PUT /api/tasks/:id` - Update task (protected)
- `DELETE /api/tasks/:id` - Delete task (protected)
- `PATCH /api/tasks/:id/toggle` - Toggle task completion (protected)

### Health Check
- `GET /api/health` - Server health check

## Features

- **MVC Architecture**: Clean separation of concerns
- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for secure password storage
- **Input Validation**: express-validator for request validation
- **Error Handling**: Comprehensive error handling middleware
- **Database Connection**: Robust MongoDB connection with error handling
- **CORS Support**: Cross-origin resource sharing enabled
- **Environment Configuration**: Environment-based configuration

## Development

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation
```bash
npm install
```

### Running the Server
```bash
# Development mode
npm run dev

# Production mode
npm start
```

### Database Setup
Make sure MongoDB is running:
- **Local MongoDB**: Start MongoDB service
- **MongoDB Atlas**: Use your Atlas connection string in `.env`

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Input validation and sanitization
- Protected routes with middleware
- Environment variable protection

## Error Handling

- Global error handling middleware
- Database connection error handling
- Validation error responses
- 404 route handling
- Structured error responses

## Dependencies

### Production
- `express` - Web framework
- `mongoose` - MongoDB object modeling
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT token handling
- `cors` - Cross-origin resource sharing
- `dotenv` - Environment variable loading
- `express-validator` - Input validation

### Development
- `nodemon` - Development server with auto-restart

## Contributing

1. Follow the MVC pattern
2. Add proper error handling
3. Include input validation
4. Write descriptive comments
5. Test all endpoints

## License

This project is part of the Taskify MERN stack application.
