**Disclaimer:** This is a pure backend application. There is no frontend connected, and all functionalities should be tested using tools like Postman.

## Features

- User authentication (Registration, Login)
- User roles (Admin, Customer/User)
- Item CRUD operations (Admin only)
- Like/Dislike functionality for items (Users only)

## Technologies Used

- Node.js
- Express.js
- MongoDB (MongoDB Atlas)
- JWT for authentication
- bcryptjs for password hashing

## Installation and Setup

1. **Clone the Repository:**
2. **Navigate to the Project Directory:**
3. **Install Dependencies:**
4. **Create a `.env` File:**

- Add your MongoDB URI and session secret to the `.env` file:
  ```
  MONGO_URI=<your-mongodb-uri>
  JWT_SECRET=<your-session-secret>
  ```

5. **Start the Application:**

# API Endpoints

## Authentication

1. POST /api/users/register - Register a new user.
2. POST /api/users/login - Login and receive a JWT token.

## User (Authenticated)

1. GET /api/users/items - View all items.
2. POST /api/users/items/:itemId/like - Like an item.
3. POST /api/users/items/:itemId/dislike - Dislike an item.

## Admin (Authenticated + Admin Role)

1. POST /api/admin/items - Create a new item.
2. PUT /api/admin/items/:itemId - Update an item.
3. DELETE /api/admin/items/:itemId - Delete an item.
