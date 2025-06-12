import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
import bioRoutes from './routes/bio.routes.js';
import projectRoutes from './routes/project.routes.js';
import themeRoutes from './routes/theme.routes.js';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Enhanced CORS configuration
const allowedOrigins = [
  'http://localhost:5173', 
  'https://twoportfolio-project.onrender.com'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/bio', bioRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/theme', themeRoutes);

// Serve React build
const frontendDist = path.join(__dirname, "../frontend/dist");
app.use(
  "/assets",
  express.static(path.join(frontendDist, "assets"), {
    maxAge: "1d",
    index: false,
    fallthrough: false,
  })
);
app.use(
  express.static(frontendDist, {
    maxAge: "1d",
    index: false,
  })
);

// Handle unmatched API routes
app.use("/api/*", (req, res) => {
  res.status(404).json({
    success: false,
    status: 404,
    message: "API endpoint not found",
  });
});

// SPA fallback
app.get("*", (req, res) =>
  res.sendFile(path.join(frontendDist, "index.html"))
);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: err.message,
      details: err.errors || {},
    });
  }
  const status = err.statusCode || 500;
  res.status(status).json({
    success: false,
    status,
    message: err.message || 'Internal Server Error',
  });
});

// Connect to MongoDB
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI, { dbName: 'portfolio' })
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });