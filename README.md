# Library Management API

A professional RESTful API for managing a library system, built with **Express.js**, **TypeScript**, and **MongoDB**. This API allows you to manage books and borrowing operations efficiently, with robust validation and error handling.

## Features

- **Book Management**

  - Create, read, update, and delete books
  - Filter, sort, and paginate book listings
  - Enforced unique ISBN and genre validation
  - Track available copies and borrowing status

- **Borrowing System**

  - Borrow books with quantity and due date
  - Prevent borrowing if not enough copies are available
  - Aggregated summary of borrowed books

- **Robust Error Handling**

  - Centralized error handler for validation and server errors
  - Custom responses for unknown endpoints

- **Modern Stack**
  - TypeScript for type safety
  - Mongoose ODM for MongoDB
  - Express 5 for routing and middleware

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v22 or above recommended)
- [npm](https://www.npmjs.com/) or [yarn]
- [MongoDB](https://www.mongodb.com/) instance (local or cloud)

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/jakariyaa/NLWD-B5-Assignment-3.git &&
   cd NLWD-B5-Assignment-3
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Configure environment variables:**

   - Create a `.env` file in the root directory.
   - Add the following:
     ```env
     MONGO_URI=mongodb://localhost:27017/librarydb
     PORT=3000
     ```
   - Adjust `MONGO_URI` as needed for your MongoDB setup.

4. **Build the project:**

   ```sh
   npm run build
   ```

5. **Start the server:**

   - For production:
     ```sh
     npm start
     ```
   - For development (with hot-reload):
     ```sh
     npm run dev
     ```
     _`tsx` is required. Run: `npm install -g tsx`_

6. **API Endpoints:**

   - Base URL: `http://localhost:3000`
   - Books: `/api/books`
   - Borrow: `/api/borrow`

## Example API Usage

- **Create a Book:**

  ```http
  POST /api/books
  Content-Type: application/json
  {
    "title": "The Theory of Everything",
    "author": "Stephen Hawking",
    "genre": "SCIENCE",
    "isbn": "9780553380163",
    "description": "An overview of cosmology and black holes.",
    "copies": 5,
    "available": true
  }
  ```

- **Borrow a Book:**
  ```http
  POST /api/borrow
  Content-Type: application/json
  {
    "book": "64ab3f9e2a4b5c6d7e8f9012",
    "quantity": 2,
    "dueDate": "2025-07-18T00:00:00.000Z"
  }
  ```
  _Change `book` to the ID of the book you want to borrow_

## Project Structure

```
NLWD-B5-Assignment-3/
├── src/
│   ├── app.ts                # Express app setup
│   ├── server.ts             # Server entry point
│   └── app/
│       ├── controllers/      # Route controllers
│       ├── interfaces/       # TypeScript interfaces
│       ├── middlewares/      # Error & endpoint handlers
│       └── models/           # Mongoose models
├── dist/                     # Compiled JavaScript output
├── .env                      # Environment variables
├── package.json
├── tsconfig.json
└── vercel.json
```

## License

This project is licensed under the MIT License.

## Feedback

If you have any suggestions or feedback, please [open an issue](https://github.com/jakariyaa/NLWD-B5-Assignment-3/issues/new) or [contact me](https://github.com/jakariyaa/).
