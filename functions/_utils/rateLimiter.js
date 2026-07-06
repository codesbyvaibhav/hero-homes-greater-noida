/**
 * Enforces rate limiting on form submissions based on client IP.
 * Uses Cloudflare's in-memory Cache API to store rate limit counts without DB overhead.
 * @param {string} ip - Client IP address
 * @returns {Promise<{isRateLimited: boolean, limitRemaining?: number}>}
 */
export async function checkRateLimit(ip) {
  if (!ip || ip === '127.0.0.1') {
    // Skip limiting for local test runs
    return { isRateLimited: false, limitRemaining: 10 };
  }

  try {
    const cache = caches.default;
    // Create a unique dummy URL representing the client's rate-limit cache key
    const cacheKeyUrl = `https://lead-rate-limit.local/ip/${encodeURIComponent(ip)}`;
    const cacheKey = new Request(cacheKeyUrl);

    const cachedResponse = await cache.match(cacheKey);
    const now = Date.now();
    const limitDuration = 60 * 1000; // 1 minute window
    const maxSubmissions = 3; // Max 3 submissions per minute

    if (cachedResponse) {
      const data = await cachedResponse.json();
      
      // If time window has expired, reset counter
      if (now - data.timestamp > limitDuration) {
        const newData = { count: 1, timestamp: now };
        await cache.put(cacheKey, new Response(JSON.stringify(newData), {
          headers: { 'Cache-Control': 'max-age=60' }
        }));
        return { isRateLimited: false, limitRemaining: maxSubmissions - 1 };
      }

      // Check count
      if (data.count >= maxSubmissions) {
        return { isRateLimited: true };
      }

      // Increment count
      const updatedData = { count: data.count + 1, timestamp: data.timestamp };
      await cache.put(cacheKey, new Response(JSON.stringify(updatedData), {
        headers: { 'Cache-Control': 'max-age=60' }
      }));
      return { isRateLimited: false, limitRemaining: maxSubmissions - updatedData.count };
    } else {
      // First submission in this window
      const initialData = { count: 1, timestamp: now };
      await cache.put(cacheKey, new Response(JSON.stringify(initialData), {
        headers: { 'Cache-Control': 'max-age=60' }
      }));
      return { isRateLimited: false, limitRemaining: maxSubmissions - 1 };
    }
  } catch (err) {
    // If cache API is unavailable (e.g. in local mock runs), fallback gracefully
    console.warn('[Rate Limiter] Cache API unavailable. Skipping rate check:', err);
    return { isRateLimited: false, limitRemaining: 999 };
  }
}
