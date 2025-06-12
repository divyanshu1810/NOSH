# Nosh - Dish Management Dashboard

A full-stack web application for managing dishes and restaurant operations, built with React, Express, and PostgreSQL.

## 🚀 Features

- **Dish Management**: Read and update dish information
- **Real-time Updates**: WebSocket integration for live data synchronization
- **Responsive Design**: Modern React-based user interface
- **Type Safety**: Full TypeScript implementation across frontend and backend
- **Data Validation**: Robust input validation using Zod
- **Database Integration**: PostgreSQL with Sequelize ORM
- **Development Tools**: Hot reload, logging, and debugging capabilities

## 🛠️ Tech Stack

### Backend
- **Node.js** with **Express.js** - Web server framework
- **TypeScript** - Type-safe JavaScript
- **PostgreSQL** - Primary database
- **Sequelize** - Database ORM
- **WebSocket (ws)** - Real-time communication
- **Zod** - Schema validation
- **Winston** - Logging
- **Morgan** - HTTP request logging
- **CORS** - Cross-origin resource sharing

### Frontend
- **React 19** - UI framework
- **TypeScript** - Type-safe JavaScript
- **TanStack Query** - Data fetching and caching
- **React Scripts** - Build tools and development server

### Database
- **Neon PostgreSQL** - Cloud-hosted PostgreSQL database

## 📋 Prerequisites

Before running this project, make sure you have the following installed:
- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL database (or Neon account)

## ⚙️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/nosh.git
   cd nosh
   ```

2. **Install backend dependencies**
   ```bash
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd client
   npm install
   cd ..
   ```

4. **Set up environment variables**

   Create a `.env` file in the root directory:
   ```env
   PORT=8000
   DB_HOST=your_database_host
   DB_NAME=your_database_name
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   DB_PORT=5432
   NODE_ENV=development
   ```

   Create a `.env` file in the `client` directory:
   ```env
   REACT_APP_PUBLIC_API_URL=http://localhost:8000
   REACT_APP_WS_URL=ws://localhost:8000/ws
   ```

## 🚀 Running the Application

### Development Mode

1. **Start the backend server**
   ```bash
   npm run dev
   ```
   The backend will run on `http://localhost:8000`

2. **Start the frontend development server**
   ```bash
   cd client
   npm start
   ```
   The frontend will run on `http://localhost:3000`

## 📝 Available Scripts

### Backend Scripts
- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start production server

### Frontend Scripts
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

---

**Happy coding! 🍽️**