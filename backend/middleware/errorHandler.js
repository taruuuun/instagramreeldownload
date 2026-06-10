/**
 * Error Handler Middleware
 * Centralized error handling for the API
 */

/**
 * 404 Not Found handler
 */
function notFoundHandler(req, res, next) {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
}

/**
 * Global error handler
 * Catches all unhandled errors and returns consistent JSON responses
 */
function errorHandler(err, req, res, _next) {
  const timestamp = new Date().toISOString();
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  // Log the error
  console.error(`[${timestamp}] ERROR ${statusCode}: ${message}`);
  if (process.env.NODE_ENV === "development" && err.stack) {
    console.error(err.stack);
  }

  // Determine user-friendly message
  let userMessage = message;

  if (statusCode === 500 && process.env.NODE_ENV === "production") {
    userMessage = "An unexpected error occurred. Please try again later.";
  }

  // Handle specific error types
  if (err.code === "ECONNABORTED" || err.message?.includes("timeout")) {
    return res.status(408).json({
      success: false,
      message: "Request timed out. Instagram may be slow. Please try again.",
    });
  }

  if (err.response?.status === 429 || err.message?.includes("quota")) {
    return res.status(429).json({
      success: false,
      message: "API quota exceeded. Please try again later.",
    });
  }

  res.status(statusCode).json({
    success: false,
    message: userMessage,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
}

module.exports = { errorHandler, notFoundHandler };
