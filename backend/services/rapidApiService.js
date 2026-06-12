/**
 * RapidAPI Service
 * Handles communication with the Instagram Scraper API via RapidAPI
 */

const axios = require("axios");

/**
 * Fetches Instagram content info from RapidAPI
 * @param {string} url - The Instagram URL to fetch
 * @returns {Promise<Object>} - Download info
 */
async function fetchInstagramContent(url) {
  const apiKey = process.env.RAPID_API_KEY;
  const apiHost = process.env.RAPID_API_HOST || "instagram-reels-downloader-api.p.rapidapi.com";

  if (!apiKey || apiKey === "your_rapidapi_key_here") {
    throw createError(
      500,
      "RapidAPI key is not configured. Set RAPID_API_KEY in .env"
    );
  }

  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] API Request: Fetching content for ${url}`);

  try {
    const response = await axios({
      method: "GET",
      url: `https://${apiHost}/download`,
      params: {
        url: url,
      },
      headers: {
        "x-rapidapi-key": apiKey,
        "x-rapidapi-host": apiHost,
        "Content-Type": "application/json"
      },
      timeout: 20000, // 20 second timeout
    });

    const statusTimestamp = new Date().toISOString();
    console.log(
      `[${statusTimestamp}] API Response: Status ${response.status} for ${url}`
    );

    if (!response.data || !response.data.success || !response.data.data) {
      throw createError(
        404,
        response.data?.message || "Instagram content not found or API error."
      );
    }

    const data = response.data.data;

    // Extract correct fields from the specific RapidAPI schema the user provided
    let rawDownloadUrl = data.url; // fallback to main url if no medias
    let quality = "HD";
    
    // Find the mp4 video in medias array if available
    if (data.medias && Array.isArray(data.medias)) {
      const videoMedia = data.medias.find(m => m.type === "video" && m.extension === "mp4");
      if (videoMedia) {
        rawDownloadUrl = videoMedia.url;
        quality = videoMedia.quality || "HD";
      }
    }

    const rawThumbnail = data.thumbnail || "";
    const rawTitle = data.title || "Instagram Video";
    const duration = data.duration ? formatDuration(data.duration) : "00:00";
    const username = data.owner?.username || data.author || "";

    const result = {
      thumbnail: rawThumbnail,
      title: typeof rawTitle === 'string' ? rawTitle.substring(0, 100) : "Instagram Content",
      downloadUrl: rawDownloadUrl,
      duration: duration,
      quality: quality,
      type: "video",
      username: username,
      fileSize: estimateFileSize(data.duration || 15, "video"),
      raw_api_response: data
    };

    if (!result.downloadUrl) {
      throw createError(
        404,
        "Could not extract download URL from API response."
      );
    }

    return result;
  } catch (error) {
    // Re-throw our custom errors
    if (error.statusCode) {
      throw error;
    }

    // Handle Axios errors
    if (error.code === "ECONNABORTED") {
      throw createError(
        408,
        "Request timed out. Instagram servers may be slow. Please try again."
      );
    }

    if (error.response) {
      const status = error.response.status;
      const errorTimestamp = new Date().toISOString();
      console.error(
        `[${errorTimestamp}] API Error: Status ${status} for ${url}`
      );
      
      const apiMessage = error.response.data?.message || "";

      if (status === 401 || status === 403) {
        throw createError(
          status,
          `API authentication failed: ${apiMessage || "Please check your RapidAPI key and subscription."}`
        );
      }
      if (status === 404) {
        throw createError(
          404,
          "Instagram content not found. The post may be private or deleted."
        );
      }
      if (status === 429) {
        throw createError(
          429,
          "API quota exceeded. Please try again later or upgrade your RapidAPI plan."
        );
      }
      if (status >= 500) {
        throw createError(
          502,
          "Instagram API is currently unavailable. Please try again later."
        );
      }
    }

    throw createError(500, `Failed to fetch Instagram content: ${error.message}`);
  }
}

/**
 * Creates a structured error with status code
 */
function createError(statusCode, message) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

/**
 * Formats seconds into MM:SS duration string
 */
function formatDuration(seconds) {
  if (!seconds || seconds <= 0) return "00:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

/**
 * Estimates file size based on duration and type
 */
function estimateFileSize(durationSeconds, type) {
  if (type === "video") {
    // Rough estimate: ~1MB per 3 seconds for HD video
    const sizeMB = Math.max(1, Math.round((durationSeconds / 3) * 1));
    if (sizeMB >= 1000) return `${(sizeMB / 1000).toFixed(1)} GB`;
    return `~${sizeMB} MB`;
  }
  return "~2-5 MB";
}

module.exports = { fetchInstagramContent };
