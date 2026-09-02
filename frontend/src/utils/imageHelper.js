/**
 * Formulate public image URL for rendering Cloudflare R2 images on public website & admin CMS
 */
export function getImageUrl(imageKeyOrUrl) {
  if (!imageKeyOrUrl) return null;

  // If already a full HTTP / HTTPS URL, return as is
  if (imageKeyOrUrl.startsWith('http://') || imageKeyOrUrl.startsWith('https://')) {
    return imageKeyOrUrl;
  }

  // If starts with slash /api, return as is
  if (imageKeyOrUrl.startsWith('/api')) {
    return imageKeyOrUrl;
  }

  // Otherwise, route through the public backend R2 media stream
  return `/api/media/r2/${imageKeyOrUrl.replace(/^\/+/, '')}`;
}
