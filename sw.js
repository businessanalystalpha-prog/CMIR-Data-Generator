const CACHE_NAME = 'cmir-app-v2';
const assetsToCache = [
  'index.html',
  'frontend/js/main.js',
  'frontend/css/main.css',
  'logo.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(assetsToCache);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
