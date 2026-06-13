const CACHE_NAME = 'calm-corner-v1';
const ASSETS = [
  '/Cancan-s-Calm-Corner/',
  '/Cancan-s-Calm-Corner/index.html',
  '/Cancan-s-Calm-Corner/manifest.json',
  '/Cancan-s-Calm-Corner/icon-192.png',
  '/Cancan-s-Calm-Corner/icon-512.png'
];

// Install — cache all assets
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Activate — clean up old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch — serve from cache, fall back to network
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
