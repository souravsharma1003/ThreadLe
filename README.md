# ThreadLe - Blogging Platform

A full-stack blogging platform built with modern web technologies. ThreadLe allows users to create, read, and share blog posts with features like likes, comments, and admin approval workflow.

## 📋 Project Overview

ThreadLe is a complete blogging application with:
- User authentication and authorization
- Blog creation with admin approval system
- Like and comment functionality
- User profiles and dashboards
- Admin management interface
- Responsive design

## 🏗️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: CORS, Cookie Parser, HTTPOnly Cookies

### Frontend
- **Framework**: React.js with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS / CSS
- **HTTP Client**: Axios
- **State Management**: Zustand / Context API
- **Routing**: React Router

## 📁 Project Structure

```
ThreadLe/
├── backend/                 # Express.js API Server
│   ├── routes/             # API routes (auth, blog, index)
│   ├── models/             # Mongoose schemas (User, Blog, Comment)
│   ├── middlewares/        # Auth middleware
│   ├── utils/              # Utilities (DB connection, JWT)
│   ├── public/             # Static files
│   ├── app.js              # Express app configuration
│   ├── package.json
│   ├── .env                # Environment variables
│   └── README.md           # Backend documentation
│
├── frontend/               # React Vite Application
│   ├── src/
│   │   ├── components/     # Reusable React components
│   │   ├── pages/          # Page components (Home, Login, etc.)
│   │   ├── stores/         # State management (auth, blog)
│   │   ├── types/          # TypeScript type definitions
│   │   ├── App.tsx         # Main app component
│   │   └── main.tsx        # Entry point
│   ├── public/             # Static assets
│   ├── package.json
│   ├── tsconfig.json       # TypeScript configuration
│   ├── vite.config.ts      # Vite configuration
│   ├── tailwind.config.js  # Tailwind CSS config
│   ├── .env                # Environment variables
│   └── README.md           # Frontend documentation
│
└── README.md               # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB instance (local or cloud like MongoDB Atlas)

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file with:**
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Start the server**
   ```bash
   npm start
   ```
   Server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file with:**
   ```
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```
   Application will run on `http://localhost:5173` (or specified Vite port)

## ✨ Features

### User Features
- ✅ User Registration and Login
- ✅ Create and publish blog posts
- ✅ Like/unlike blog posts
- ✅ Comment on blogs
- ✅ View user profile
- ✅ View personal dashboard
- ✅ Track published and pending blogs

### Admin Features
- ✅ Admin dashboard
- ✅ Approve pending blogs
- ✅ Reject blogs
- ✅ Manage user content

### Technical Features
- ✅ JWT-based authentication
- ✅ HTTPOnly secure cookies
- ✅ CORS enabled for cross-origin requests
- ✅ MongoDB with Mongoose ODM
- ✅ Responsive design
- ✅ Protected routes

## 🔗 API Endpoints

### Authentication (`/api/auth`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/signup` | Register new user |
| POST | `/login` | Login user |
| GET | `/me` | Get current user info |

### Blogs (`/api/blogs`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Fetch all published blogs |
| POST | `/create` | Create new blog |
| GET | `/:id` | Get blog by ID |
| PATCH | `/:id/approve` | Approve blog (Admin) |
| PATCH | `/:id/reject` | Reject blog (Admin) |
| DELETE | `/:id` | Delete blog |
| POST | `/:id/like` | Like/unlike blog |
| POST | `/:id/comments` | Add comment to blog |
| GET | `/user/:userId` | Get blogs by user |

## 📦 Build for Production

### Backend
```bash
cd backend
npm install
npm start
```

### Frontend
```bash
cd frontend
npm install
npm run build
```

The built files will be in the `dist/` directory.

## 🔒 Security Notes

- Passwords should be hashed using bcrypt before storing (currently stored as plain text)
- JWT tokens expire after 24 hours
- Cookies are set as HTTPOnly for enhanced security
- CORS is configured to accept requests from specified origins
- Always use HTTPS in production
- Keep `.env` files out of version control

## 📝 Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/threadle
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

## 🛠️ Development

### Code Standards
- Follow consistent naming conventions
- Use meaningful variable and function names
- Add comments for complex logic
- Test API endpoints before committing

### Common Issues

**MongoDB Connection Error**
- Ensure MongoDB is running
- Check MONGODB_URI in .env

**CORS Errors**
- Verify frontend URL matches backend CORS config
- Check credentials: true is set in API calls

**JWT Token Errors**
- Ensure JWT_SECRET is set in backend .env
- Check token expiration time

## 📚 Additional Resources

- See [backend/README.md](backend/README.md) for detailed backend documentation
- See [frontend/README.md](frontend/README.md) for detailed frontend documentation
- MongoDB Mongoose Documentation: https://mongoosejs.com/
- Express.js Documentation: https://expressjs.com/
- React Documentation: https://react.dev/
- Vite Documentation: https://vitejs.dev/

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author
Sourav Sharma
ThreadLe Blogging Platform - 2026

---

**Happy Blogging! 📝**
