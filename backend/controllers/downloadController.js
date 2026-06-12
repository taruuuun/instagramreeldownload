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

/**
 * GET /api/download-file
 * Proxies the download request to bypass CORS and force download
 */
async function downloadFileProxy(req, res, next) {
  const axios = require("axios");
  try {
    const { url, filename } = req.query;
    
    if (!url) {
      return res.status(400).json({
        success: false,
        message: "URL parameter is required"
      });
    }

    const decodedUrl = url;

    if (!decodedUrl.startsWith("http://") && !decodedUrl.startsWith("https://")) {
      return res.status(400).json({
        success: false,
        message: "Invalid URL protocol"
      });
    }

    console.log(`[${new Date().toISOString()}] Proxy Download Request: ${decodedUrl}`);

    const response = await axios({
      method: "get",
      url: decodedUrl,
      responseType: "stream",
      timeout: 30000,
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      }
    });

    const contentType = response.headers["content-type"] || "video/mp4";
    const contentLength = response.headers["content-length"];

    res.setHeader("Content-Type", contentType);
    if (contentLength) {
      res.setHeader("Content-Length", contentLength);
    }

    const safeFilename = filename 
      ? filename.replace(/[^a-zA-Z0-9.\-_]/g, "_") 
      : `savereel_${Date.now()}.mp4`;
      
    res.setHeader("Content-Disposition", `attachment; filename="${safeFilename}"`);

    response.data.pipe(res);

    response.data.on("error", (err) => {
      console.error(`[${new Date().toISOString()}] Stream Error during download:`, err.message);
      if (!res.headersSent) {
        res.status(500).send("Error streaming the download file.");
      }
    });

  } catch (error) {
    console.error(`[${new Date().toISOString()}] Proxy Download Error:`, error.message);
    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        message: `Failed to fetch and stream file: ${error.message}`
      });
    }
  }
}

module.exports = { downloadContent, downloadFileProxy };
