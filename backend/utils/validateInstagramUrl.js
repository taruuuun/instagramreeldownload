/**
 * Instagram URL Validator
 * Validates that a URL is a valid public Instagram content link
 */

/**
 * Validates an Instagram URL
 * Supports: /reel/, /p/, /stories/, /reels/, /tv/
 * @param {string} url - The URL to validate
 * @returns {{ valid: boolean, type: string|null, error: string|null }}
 */
function validateInstagramUrl(url) {
  if (!url || typeof url !== "string") {
    return {
      valid: false,
      type: null,
      error: "URL is required and must be a string.",
    };
  }

  const trimmedUrl = url.trim();

  if (!trimmedUrl) {
    return {
      valid: false,
      type: null,
      error: "URL cannot be empty.",
    };
  }

  // Must start with http:// or https://
  if (!trimmedUrl.startsWith("http://") && !trimmedUrl.startsWith("https://")) {
    return {
      valid: false,
      type: null,
      error: "URL must start with http:// or https://",
    };
  }

  // Check if it's an Instagram URL
  const instagramPattern =
    /^https?:\/\/(www\.)?instagram\.com\/(reel|reels|p|stories|tv)\/[A-Za-z0-9_-]+\/?/;

  if (!instagramPattern.test(trimmedUrl)) {
    return {
      valid: false,
      type: null,
      error:
        "Invalid Instagram URL. Supported formats: instagram.com/reel/, instagram.com/p/, instagram.com/stories/",
    };
  }

  // Determine content type
  let type = null;
  if (/\/reel\/|\/reels\//.test(trimmedUrl)) type = "reel";
  else if (/\/p\//.test(trimmedUrl)) type = "post";
  else if (/\/stories\//.test(trimmedUrl)) type = "story";
  else if (/\/tv\//.test(trimmedUrl)) type = "igtv";

  return {
    valid: true,
    type,
    error: null,
  };
}

module.exports = { validateInstagramUrl };
