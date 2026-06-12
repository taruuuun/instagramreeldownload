/**
 * Download Routes
 * API routes for Instagram content downloading
 */

const express = require("express");
const router = express.Router();
const { downloadContent, downloadFileProxy } = require("../controllers/downloadController");

/**
 * POST /api/download
 * Body: { "url": "https://www.instagram.com/reel/xxxx/" }
 * Response: { success, thumbnail, title, downloadUrl, duration, quality }
 */
router.post("/download", downloadContent);

/**
 * GET /api/download-file
 * Query params: url, filename
 * Streams the file directly to force download and bypass CORS
 */
router.get("/download-file", downloadFileProxy);

module.exports = router;
