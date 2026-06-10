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

    if (!response.data) {
      throw createError(
        404,
        "Instagram content not found. The post may be private or deleted."
      );
    }

    const data = response.data;

    // Check if the API returned an error message directly (like "You are not subscribed to this API.")
    if (data.message && typeof data.message === 'string' && !data.download_url && !data.videoUrl && !data.data) {
      throw createError(403, `API Error: ${data.message}`);
    }

    // Try to extract download url from various common rapidapi structures
    const rawDownloadUrl = data.download_url || data.videoUrl || data.url || (data.data && (data.data.video_url || data.data.download_url)) || "";
    const rawThumbnail = data.thumbnail_url || data.thumbnailUrl || data.thumbnail || (data.data && data.data.thumbnail_url) || "";
    const rawTitle = data.title || data.caption || (data.data && (data.data.caption || data.data.title)) || "Instagram Video";

    // Since we don't have the exact schema, we will pass everything back plus our structured fields
    const result = {
      thumbnail: rawThumbnail,
      title: typeof rawTitle === 'string' ? rawTitle.substring(0, 100) : "Instagram Content",
      downloadUrl: rawDownloadUrl,
      duration: "00:00",
      quality: "HD",
      type: "video",
      username: "",
      fileSize: "~5 MB",
      raw_api_response: data // Passing the raw response in case the frontend needs to parse it directly
    };

    if (!result.downloadUrl && !result.raw_api_response) {
      throw createError(
        404,
        "Could not extract download URL. The content may be unsupported."
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
