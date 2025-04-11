# 🛡️ NestJS Authentication API

This is a backend authentication service built with **NestJS**, **MongoDB**, and **JWT**. It provides essential features like user registration, login, and token verification.

---

## 🚀 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yassinechmarekh/task-pubsilon.git
   cd backend

   ```

2. Install dependencies:

   ```bash
   npm install

   ```

3. Create a .env file at the root of the project and add the following variables:

   ```env
   PORT=8000                     # (Optional) Default port is 8000
   MONGO_URI=mongodb://...       # Your MongoDB connection string
   JWT_SECRET=your_jwt_secret    # Your JWT secret key
   JWT_EXPIRES=3600s             # Token expiration (e.g., 1h, 3600s)

   ```

4. Run the development server:

   ```bash
   npm run start:dev
   ```

---

# 🗂️ Project Structure

![Our project structure](/public/images/readme.png)

# 🔐 Auth Module Features

The auth module handles user authentication:
+ register: Creates a new user in the database.
+ login: Verifies credentials and returns a JWT.
+ verify-token: Validates a given token.

# 🔌 API Endpoints

### * Register
+ Description: Register a new user
+ Methode: POST
+ Endpoint: http://localhost:8000/api/auth/register
+ Body: 	`{ "username": "", "email": "", "password": "" }`

### * Login
+ Description: User Login
+ Methode: POST
+ Endpoint: http://localhost:8000/api/auth/login
+ Body: 	`{ "email": "", "password": "" }	`

### * Token verification
+ Description: Verify JWT token
+ Methode: POST
+ Endpoint: http://localhost:8000/api/auth/verify-token
+ Body: 	`{ "token": "" }`

# 📦 Built With

+ NestJS – A progressive Node.js framework
+ MongoDB – NoSQL Database
+ Mongoose – ODM for MongoDB
+ JWT – JSON Web Tokens for authentication
+ TypeScript – Typed JavaScript