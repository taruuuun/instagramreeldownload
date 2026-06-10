export function isValidInstagramUrl(url: string): boolean {
  const regex =
    /^https?:\/\/(www\.)?instagram\.com\/(p|reel|reels|stories|tv)\/[A-Za-z0-9_-]+\/?(\?.*)?$/;
  return regex.test(url.trim());
}

export async function pasteFromClipboard(): Promise<string> {
  try {
    const text = await navigator.clipboard.readText();
    return text;
  } catch {
    return "";
  }
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}
