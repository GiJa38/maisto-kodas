const CACHE_NAME = 'maisto-kodas-v1';
const ASSETS = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './manifest.json',
  './app_icon.png'
];

// Install Service Worker and cache assets
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Activate Service Worker and clean old caches
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch assets: Network-First Strategy (always gets latest from GitHub, falls back to cache offline)
self.addEventListener('fetch', (e) => {
  // Do not intercept or cache API calls to Google Gemini
  if (e.request.url.includes('googleapis.com')) {
    return;
  }

  e.respondWith(
    fetch(e.request)
      .then((networkResponse) => {
        // If request is successful, clone and update the cache
        if (networkResponse && networkResponse.status === 200) {
          const cacheCopy = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(e.request, cacheCopy);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        // If offline / network fails, serve from cache
        return caches.match(e.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          // If not in cache and offline, fail gracefully
        });
      })
  );
});
