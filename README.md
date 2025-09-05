# Server Project

This is the backend server for the e-commerce application built using **Node.js**, **Express.js**, and **MongoDB**. It handles authentication, product management, category management, and file uploads.

## Features

- User authentication (JWT + cookies)
- Product CRUD operations
- Category CRUD operations
- File/image uploads using `multer` and image processing using `sharp`
- Input validation with `express-validator`
- Secure HTTP headers with `helmet`
- CORS setup for frontend integration
- Email notifications using `nodemailer`

## Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT for authentication
- Multer & Sharp for file uploads
- Nodemailer for emails
- Helmet for security
- Cors for cross-origin requests

## Getting Started

### Prerequisites

- Node.js >= 18.x
- MongoDB database
- `.env` file with the following keys:
  ```env
  PORT=5000
  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret


Install Dependencies
npm install

Run the Server
npm start
# or for development
npm run dev


The server will run on http://localhost:5000 by default.

API Endpoints
User Authentication

POST /api/user/register → Register a new user

POST /api/user/login → Login user

POST /api/user/logout → Logout user

Categories

GET /api/admin/category/view → Get all categories

POST /api/admin/category/store → Create a new category

PUT /api/admin/category/update/:id → Update category

DELETE /api/admin/category/delete/:id → Delete category

Products

GET /api/admin/product/view → Get all products (with pagination)

POST /api/admin/product/store → Create a new product (with image upload)

PUT /api/admin/product/update/:id → Update product

DELETE /api/admin/product/delete/:id → Delete product (with multiple images)

File Uploads

Image uploads handled with multer in memoryStorage

Images processed with sharp and saved to /public/data/uploads/

Folder Structure
server/
├─ config/
│  └─ db.config.js
├─ controllers/
├─ middlewares/
├─ models/
├─ routes/
├─ public/
│  └─ data/uploads/
├─ index.js
├─ package.json
└─ .env

Dependencies

bcryptjs → Password hashing

body-parser → Parse request bodies

cookie-parser → Handle cookies

cors → Cross-origin resource sharing

dotenv → Environment variables

express → Backend framework

express-validator → Request validation

helmet → Security headers

jsonwebtoken → JWT authentication

mongoose → MongoDB ODM

multer → File uploads

nodemailer → Sending emails

sharp → Image processing