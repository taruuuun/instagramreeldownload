/**
 * Save Reel Backend - Main Server
 * Production-ready Node.js + Express API for Instagram content downloading
 */

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const downloadRoutes = require("./routes/downloadRoutes");
const { errorHandler, notFoundHandler } = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 5000;

// ========================
// Security Middleware
// ========================

// Helmet - HTTP security headers
app.use(helmet());

// CORS - Allow frontend origin
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5174",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);

// Rate Limiter - Prevent abuse
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests. Please try again after 15 minutes.",
  },
});
app.use("/api/", limiter);

// Body Parser
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

// ========================
// Request Logger
// ========================
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.originalUrl;
  const ip = req.ip || req.connection.remoteAddress;
  console.log(`[${timestamp}] ${method} ${url} - IP: ${ip}`);
  next();
});

// ========================
// Routes
// ========================

// Root Route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Save Reel API is running.",
    health: "/api/health"
  });
});

// Health Check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || "development",
  });
});

// Download Routes
app.use("/api", downloadRoutes);

// ========================
// Error Handling
// ========================
app.use(notFoundHandler);
app.use(errorHandler);

// ========================
// Start Server
// ========================
app.listen(PORT, () => {
  console.log(`\n========================================`);
  console.log(`  Save Reel Backend Server`);
  console.log(`========================================`);
  console.log(`  Status:      Running`);
  console.log(`  Port:        ${PORT}`);
  console.log(`  Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`  CORS Origin: ${process.env.CORS_ORIGIN || "http://localhost:5174"}`);
  console.log(`  Health:      http://localhost:${PORT}/api/health`);
  console.log(`  API:         http://localhost:${PORT}/api/download`);
  console.log(`========================================\n`);
});

module.exports = app;
