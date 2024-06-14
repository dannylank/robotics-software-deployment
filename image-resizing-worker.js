/**
 * CloudFlare Worker for Image Resizing and Caching
 *
 * This worker script intercepts requests for images and performs the following tasks:
 * 1. Checks if the requested image is already cached in CloudFlare's cache storage.
 * 2. If cached, returns the cached image.
 * 3. If not cached, fetches the original image from the specified URL.
 * 4. Resizes the image using the Sharp library to a specified width.
 * 5. Caches the resized image in CloudFlare's cache storage.
 * 6. Returns the resized image with appropriate cache headers.
 *
 * The script uses the following libraries and APIs:
 * - CloudFlare's `addEventListener` and `FetchEvent` for intercepting requests.
 * - CloudFlare's `caches` API for caching and retrieving cached images.
 * - The `sharp` library for resizing images.
 */

addEventListener('fetch', event => {
  event.respondWith(processRequest(event.request))
})

async function processRequest(request) {
  const imageURL = new URL(request.url)
  const imagePath = imageURL.pathname

  // Check if the image is already cached in CloudFlare's cache storage
  const cacheStorage = caches.default
  const cachedImage = await cacheStorage.match(request)
  if (cachedImage) {
    return cachedImage
  }

  // If not cached, fetch the original image from the specified URL
  const originalImage = await fetch(`https://example.com${imagePath}`)

  // Create a copy of the response to avoid consuming the original response body
  const responseClone = originalImage.clone()

  // Resize the image using the Sharp library
  const resizedImageBuffer = await sharp(await responseClone.buffer())
    .resize({ width: 800 })
    .toBuffer()

  // Create a new response with the resized image and appropriate cache headers
  const resizedImageResponse = new Response(resizedImageBuffer, {
    headers: {
      'Content-Type': 'image/jpeg',
      'Cache-Control': 'public, max-age=31536000',
    },
  })

  // Cache the resized image in CloudFlare's cache storage
  event.waitUntil(cacheStorage.put(request, resizedImageResponse.clone()))

  return resizedImageResponse
}
