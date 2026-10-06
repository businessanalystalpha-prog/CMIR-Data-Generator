const CACHE_NAME = 'cmir-app-v2';
const assetsToCache = [
  'CMIR-Data-Generator/index.html',
  'CMIR-Data-Generator/frontend/js/main.js',
  'CMIR-Data-Generator/frontend/css/main.css',
  'CMIR-Data-Generator/logo.png'
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
