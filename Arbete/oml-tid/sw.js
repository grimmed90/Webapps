const CACHE_NAME = 'skiftschema-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/shiftConfig.js',
  '/res/site.webmanifest',
  '/res/favicon-16x16.png',
  '/res/favicon-32x32.png',
  '/res/apple-touch-icon.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request);
    })
  );
});
