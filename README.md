# Taskify - MERN Stack Todo List App

A modern, full-stack todo list application built with the MERN stack (MongoDB, Express.js, React, Node.js). Features user authentication, task management, and a beautiful responsive UI.

## Features

- **User Authentication**: Secure registration and login with JWT tokens
- **Task Management**: Create, read, update, and delete tasks
- **Task Properties**: Title, description, priority level, due date, and completion status
- **Responsive Design**: Beautiful UI that works on desktop and mobile
- **Real-time Updates**: Instant task updates and status changes
- **Data Validation**: Client and server-side validation for all inputs

## Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **MVC Architecture** - Model-View-Controller pattern

### Frontend
- **React** - UI library
- **Vite** - Build tool and development server
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Context API** - State management

## Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **npm** or **yarn**

## Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Taskify
```

### 2. Backend Setup

Navigate to the server directory and install dependencies:

```bash
cd server
npm install
```

Create a `.env` file in the server directory:

```bash
# server/.env
PORT=5000
MONGODB_URI=
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

**Important**: Replace `your-super-secret-jwt-key-change-this-in-production` with a strong, random secret key for production use.

### 3. Frontend Setup

Navigate to the client directory and install dependencies:

```bash
cd ../client
npm install
```

### 4. Database Setup

Make sure MongoDB is running on your system:

- **Local MongoDB**: Start MongoDB service
- **MongoDB Atlas**: Use your Atlas connection string in the `.env` file

## Running the Application

### Development Mode

1. **Start the Backend Server**:
```bash
cd server
npm run dev
```
The server will start on `http://localhost:5000`

2. **Start the Frontend** (in a new terminal):
```bash
cd client
npm run dev
```
The React app will start on `http://localhost:3000`

### Production Mode

1. **Build the Frontend**:
```bash
cd client
npm run build
```

2. **Start the Backend**:
```bash
cd server
npm start
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

## Usage

1. **Register**: Create a new account with username, email, and password
2. **Login**: Sign in with your email and password
3. **Create Tasks**: Click "Add Task" to create new tasks with title, description, priority, and due date
4. **Manage Tasks**: Edit, delete, or mark tasks as complete
5. **Track Progress**: View your completion statistics on the dashboard

## Example User

**Email:** josh@gmail.com
**Password:** 123456

## Project Structure

```
Taskify/
├── server/                 # Backend (Node.js/Express)
│   ├── src/
│   │   ├── config/        # Database configuration
│   │   ├── controllers/   # Business logic controllers
│   │   ├── middleware/     # Custom middleware
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   └── index.js        # Main server file
│   ├── package.json       # Backend dependencies
│   └── .env               # Environment variables
├── client/                # Frontend (React + Vite)
│   ├── public/
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── contexts/      # React contexts
│   │   ├── App.jsx        # Main App component
│   │   └── main.jsx       # Entry point
│   ├── package.json       # Frontend dependencies
│   └── vite.config.js     # Vite configuration
└── README.md
```

## Features in Detail

### Authentication
- Secure password hashing with bcrypt
- JWT token-based authentication
- Protected routes and API endpoints
- User session management

### Task Management
- Full CRUD operations for tasks
- Task properties: title, description, priority, due date
- Task completion tracking
- User-specific task isolation

### UI/UX
- Modern, responsive design
- Intuitive task management interface
- Real-time form validation
- Loading states and error handling
- Mobile-friendly layout

## Environment Variables

### Backend (.env)
```
PORT=5000                                    # Server port
MONGODB_URI=mongodb://localhost:27017/taskify # MongoDB connection string
JWT_SECRET=your-secret-key                   # JWT signing secret
NODE_ENV=development                         # Environment mode
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Important Note About Server

The backend is hosted on Render.com using their free tier service. Please note:

- The server is located at: https://taskify-51gq.onrender.com/
- The server spins down after 15 minutes of inactivity
- Initial startup can take up to 5 minutes when the server is cold
- To wake up the server, you can:
  - Visit https://taskify-51gq.onrender.com/api/health
  - Or make any API call to the server

If you experience delays in API responses, this is likely due to the cold start. Please wait a few minutes for the server to initialize.
