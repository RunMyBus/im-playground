export function validateAndWarnTitle(defaultTitle) {
  if (typeof window === "undefined") return;
  try {
    const current = document.title?.trim();
    const isEmpty = !current;
    const isDefault = defaultTitle && current === defaultTitle;
    const isTooLong = current && current.length > 65;
    if (isEmpty || isDefault || isTooLong) {
      // Dev-time only: warn in console so pages add proper titles
      if (process.env.NODE_ENV !== "production") {
        // eslint-disable-next-line no-console
        console.warn(
          `[seo] Page <title> check: ${
            isEmpty ? "missing" : isDefault ? "uses default" : "too long"
          } (${current?.length || 0} chars).`,
        );
      }
    }
  } catch (_) {
    // ignore
  }
}


// Server-safe helper to format titles to ~60 chars, preserving leading keywords.
// - Keeps the first segment before a separator (|, -, ":") if present
// - Appends brand suffix if provided and space allows; otherwise trims gracefully
// - Ensures final length <= maxLen (default 60)
export function formatTitle(rawTitle, options = {}) {
  const {
    brandSuffix = "Igniting Minds",
    maxLen = 60,
    separator = " | ",
  } = options;

  if (!rawTitle || typeof rawTitle !== "string") return brandSuffix;

  const title = rawTitle.trim();
  if (title.length <= maxLen) return title;

  // Split on common separators to detect leading keyword part
  const parts = title.split(/\s[|:\-]\s/);
  const primary = parts[0] ? parts[0].trim() : title;

  // Try primary + brand within limit
  const candidate = `${primary}${brandSuffix ? `${separator}${brandSuffix}` : ""}`.trim();
  if (candidate.length <= maxLen) return candidate;

  // If still too long, hard-trim primary to fit (reserve suffix if useful)
  const reserve = brandSuffix ? separator.length + brandSuffix.length : 0;
  const allowedPrimary = Math.max(0, maxLen - reserve);
  const trimmedPrimary = smartTrim(primary, allowedPrimary);
  const withSuffix = `${trimmedPrimary}${brandSuffix ? `${separator}${brandSuffix}` : ""}`.trim();
  if (withSuffix.length <= maxLen) return withSuffix;

  // Fallback: trim whole title hard to maxLen
  return smartTrim(title, maxLen);
}

function smartTrim(text, maxLen) {
  if (text.length <= maxLen) return text;
  // Cut to limit, then backtrack to last space to avoid mid-word cut
  const slice = text.slice(0, maxLen);
  const lastSpace = slice.lastIndexOf(" ");
  const base = lastSpace > 40 ? slice.slice(0, lastSpace) : slice; // keep decent chunk
  return `${base.replace(/[\s|:\-]+$/, "")}…`;
}


