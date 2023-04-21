const CACHE_NAME = "muscle-load-cache-v1";
const urlsToCache = [
  "/",
  "/home.html",
  "/timer.html",
  "/css/reset.css",
  "/css/parts.css",
  "/css/layout.css",
  "/css/timer.scss",
  "/css/timer.css",
  "/js/script.js",
  "/js/timer.js",
  "/img/icons/icon-512x512.png"
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
   
