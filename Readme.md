# Simple MERN App

This is a simple MERN (MongoDB, Express, React, Node.js) application for managing products. The app allows users to create, read, update, and delete products.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/Abhijeet14d/Simple_Mern_App.git
    cd simple_mern_app
    ```

2. Install backend dependencies:

    ```sh
    cd backend
    npm install
    ```

3. Install frontend dependencies:

    ```sh
    cd ../frontend
    npm install
    ```

4. Create a `.env` file in the `backend` directory and add your MongoDB connection string:

    ```env
    MONGO_URI=your_mongodb_connection_string
    PORT=5000
    ```

## Usage

1. Start the backend server:

    ```sh
    cd backend
    npm run dev
    ```

2. Start the frontend development server:

    ```sh
    cd ../frontend
    npm run dev
    ```

3. Open your browser and navigate to `http://localhost:3000`.

## API Endpoints

- **GET /api/products**: Get all products
- **POST /api/products**: Create a new product
- **PUT /api/products/:id**: Update a product by ID
- **DELETE /api/products/:id**: Delete a product by ID

## Project Structure
simple_mern_app/ 
├── backend/ 
│ ├── config/ 
│ │ └── db.js 
│ ├── controllers/ 
│ │ └── controller.js 
│ ├── models/ 
│ │ └── product.js 
│ ├── routes/ 
│ │ └── productRoutes.js 
│ └── server.js 
├── frontend/ 
│ ├── public/ 
│ ├── src/ 
│ │ ├── assets/ 
│ │ ├── components/ 
│ │ │ ├── Navbar.jsx 
│ │ │ └── ProductCard.jsx 
│ │ ├── pages/ 
│ │ │ ├── CreatePage.jsx 
│ │ │ └── HomePage.jsx 
│ │ ├── store/ 
│ │ │ └── product.js 
│ │ ├── App.jsx 
│ │ └── main.jsx 
│ ├── .gitignore 
│ ├── eslint.config.js 
│ ├── index.html 
│ ├── package.json 
│ └── vite.config.js 
├── .env 
├── .gitignore 
├── package.json 
└── README.md


## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.
