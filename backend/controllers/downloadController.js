/**
 * Download Controller
 * Handles Instagram download requests
 */

const { validateInstagramUrl } = require("../utils/validateInstagramUrl");
const { fetchInstagramContent } = require("../services/rapidApiService");

/**
 * POST /api/download
 * Downloads Instagram content from a given URL
 */
async function downloadContent(req, res, next) {
  try {
    const { url } = req.body;
    const timestamp = new Date().toISOString();

    // Log incoming request
    console.log(`[${timestamp}] Download Request: ${url || "(empty)"}`);

    // Validate URL
    const validation = validateInstagramUrl(url);
    if (!validation.valid) {
      console.log(`[${timestamp}] Validation Failed: ${validation.error}`);
      return res.status(400).json({
        success: false,
        message: validation.error,
      });
    }

    console.log(
      `[${timestamp}] URL Valid: type=${validation.type}, url=${url}`
    );

    // Fetch content from RapidAPI
    const content = await fetchInstagramContent(url);

    const successTimestamp = new Date().toISOString();
    console.log(
      `[${successTimestamp}] Download Success: type=${content.type}, quality=${content.quality}`
    );

    // Return response
    return res.status(200).json({
      success: true,
      thumbnail: content.thumbnail,
      title: content.title,
      downloadUrl: content.downloadUrl,
      duration: content.duration,
      quality: content.quality,
      type: content.type,
      username: content.username,
      fileSize: content.fileSize,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { downloadContent };
