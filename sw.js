const CACHE_NAME = "muscle-load-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/css/reset.css",
  "/css/parts.css",
  "/css/layout.css",
  "/js/script.js",
  "/images/icons/icon-384x384.png",
  "/images/icons/icon-512x512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith( caches.match(event.request)
  .then(response => response || fetch(event.request))
  );
  });
   
