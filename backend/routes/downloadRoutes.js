/**
 * Download Routes
 * API routes for Instagram content downloading
 */

const express = require("express");
const router = express.Router();
const { downloadContent } = require("../controllers/downloadController");

/**
 * POST /api/download
 * Body: { "url": "https://www.instagram.com/reel/xxxx/" }
 * Response: { success, thumbnail, title, downloadUrl, duration, quality }
 */
router.post("/download", downloadContent);

module.exports = router;
