import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import authMiddleware from './middleware/authMiddleware.js';
import projectRoutes from './routes/projectRoutes.js';
import userRoutes from './routes/userRoutes.js';
import initializeSocket from './socket/index.js';
import fileRoutes from './routes/fileRoutes.js';
import { Server } from 'socket.io';
import http from 'http';
import upload from './middleware/upload.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Create HTTP server (required for Socket.IO)
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",  
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Make io available in controllers
app.set("io", io);

// Initialize all socket events
initializeSocket(io);

// Middleware
app.use(cors({
  origin: "http://localhost:5173",  
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', authMiddleware, projectRoutes);
app.use('/api/users', authMiddleware, userRoutes);
app.use('/api/files', authMiddleware, upload.single('file'), fileRoutes);

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URL, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(() => {
  console.log('Connected to MongoDB');

  // Start the server on HTTP server (not app.listen)
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})
.catch(err => console.log(err));
