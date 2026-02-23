# Auth Service

A microservice that handles authentication and authorization for the BestBuy Admin Panel. This service manages user registration, login, and profile management using JWT token-based authentication.

## Features

- **User Registration**: Create new admin accounts with email and password
- **User Login**: Authenticate users and issue JWT tokens
- **Profile Management**: Retrieve authenticated user profile information
- **Password Security**: Bcrypt hashing for secure password storage
- **JWT Authentication**: Token-based API security with configurable expiration
- **MongoDB Integration**: Persistent user data storage with Mongoose ODM
- **CORS Support**: Cross-origin request handling for frontend integration

## Technology Stack

- **Runtime**: Node.js with ES6 modules
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **Security**: Bcrypt for password hashing
- **Environment**: dotenv for configuration management
- **Development**: Nodemon for hot-reload during development

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or remote instance)
- npm or yarn

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

3. Configure environment variables in `.env`:
   ```env
   PORT=3001
   MONGO_URI=mongodb://localhost:27017/bb_auth_db
   JWT_SECRET=your_secret_key_here
   JWT_EXPIRES_IN=1d
   ```

## Running the Service

### Development Mode
```bash
npm run dev
```
Runs with Nodemon for automatic restart on file changes.

### Production Mode
```bash
npm start
```

The service will be available at `http://localhost:3001`

## API Endpoints

### Register User
- **URL**: `POST /api/auth/register`
- **Body**:
  ```json
  {
    "name": "Admin User",
    "email": "admin@example.com",
    "password": "securepassword"
  }
  ```
- **Response** (201):
  ```json
  {
    "id": "user_id",
    "email": "admin@example.com"
  }
  ```

### Login
- **URL**: `POST /api/auth/login`
- **Body**:
  ```json
  {
    "email": "admin@example.com",
    "password": "securepassword"
  }
  ```
- **Response** (200):
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
  ```

### Get Profile
- **URL**: `GET /api/auth/profile`
- **Headers**:
  ```
  Authorization: Bearer <token>
  ```
- **Response** (200):
  ```json
  {
    "_id": "user_id",
    "name": "Admin User",
    "email": "admin@example.com",
    "role": "ADMIN",
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  }
  ```

## Project Structure

```
src/
├── server.js                 # Express app initialization
├── config/
│   └── mongodb.js           # MongoDB connection setup
├── controllers/
│   └── auth.controller.js   # Route handlers
├── middleware/
│   └── auth.middleware.js   # JWT authentication middleware
├── models/
│   └── user.model.js        # User schema definition
├── repositories/
│   └── user.repository.js   # Data access layer
├── routes/
│   └── auth.routes.js       # API route definitions
├── services/
│   └── auth.service.js      # Business logic
└── utils/
    └── jwt.js               # JWT utility functions
```

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `3001` |
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/bb_auth_db` |
| `JWT_SECRET` | Secret key for JWT signing | `supersecretkey` |
| `JWT_EXPIRES_IN` | Token expiration time | `1d` |

## Docker Support

Build and run the service in Docker:

```bash
# Build the image
docker build -t auth-service .

# Run the container
docker run -p 3001:3001 --env-file .env auth-service
```

## Error Handling

- **400 Bad Request**: Invalid registration data or user already exists
- **401 Unauthorized**: Invalid credentials or missing/invalid token
- **500 Internal Server Error**: Server-side errors

## Security Considerations

- Passwords are hashed using bcrypt with a salt round of 10
- JWT tokens are signed with a secret key (configure strong secret in production)
- CORS is enabled for cross-origin access (configure allowed origins as needed)
- Password field is excluded from user profile queries
- Authentication middleware validates tokens on protected routes

## License

ISC
