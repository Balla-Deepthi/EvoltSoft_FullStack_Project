# Project Overview

This project is a full-stack application consisting of a backend API server and two frontend applications built with React and Vue.js. It is designed to manage and interact with charging stations.

# Project Structure

- **backend/**: Contains the Node.js Express backend server, which handles API requests, authentication, and database interactions.
- **fontEnd/**: Contains the React frontend application built with Vite, providing a user interface for interacting with the backend.
- **VUE/**: Contains the Vue 3 frontend application built with Vite, offering an alternative user interface.

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine
- A database setup (as configured in the backend)

### Backend Setup

1. Navigate to the `backend` directory:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure your environment variables (e.g., database connection) in a `.env` file.
4. Start the backend server:
   ```sh
   npm start
   ```
   The server will run on the port specified in your `.env` file or default to port 3000.

### Frontend Setup (React)

1. Navigate to the `fontEnd` directory:
   ```sh
   cd fontEnd
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the React development server:
   ```sh
   npm run dev
   ```
   The app will be available at `http://localhost:3000` (or the port shown in the terminal).

### Frontend Setup (Vue)

1. Navigate to the `VUE` directory:
   ```sh
   cd VUE
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the Vue development server:
   ```sh
   npm run dev
   ```
   The app will be available at `http://localhost:3000` (or the port shown in the terminal).

## Usage

- Use the React or Vue frontend to interact with the backend API.
- The backend provides authentication and charging station management APIs.
- Make sure the backend server is running before starting the frontend applications.

## Additional Information ##

- The backend uses Express.js and connects to a database (configured in `backend/config/db.js`).
- The React frontend uses Vite and React with ESLint configured.
- The Vue frontend uses Vue 3 with Vite and ESLint configured.

## License

This project is open source and free to use.
