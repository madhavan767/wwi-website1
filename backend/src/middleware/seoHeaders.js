/**
 * Middleware enforcing strict Search Engine exclusion on all admin routes.
 * Requirement: X-Robots-Tag: noindex, nofollow, noarchive, nosnippet
 */
export const enforceNoIndexAdmin = (req, res, next) => {
  res.setHeader('X-Robots-Tag', 'noindex, nofollow, noarchive, nosnippet');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  next();
};
