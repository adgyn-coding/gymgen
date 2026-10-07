const CACHE_NAME = 'gymgen-cache-v1';
const FILES_TO_CACHE = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './manifest.json',
  './Icons/Logo GymGen (192x192) (2).png',
  './Icons/Logo GymGen (512x512).png'
];

// Installer le service worker (mise en cache initiale)
self.addEventListener('install', (event) => {
  console.log('[ServiceWorker] Installation');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[ServiceWorker] Mise en cache des fichiers');
        return cache.addAll(FILES_TO_CACHE);
      })
  );
  self.skipWaiting();
});

// Activer le SW
self.addEventListener('activate', (event) => {
  console.log('[ServiceWorker] Activation');
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          console.log('[ServiceWorker] Suppression du vieux cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  self.clients.claim();
});

// Intercepter les requêtes pour servir les fichiers du cache
self.addEventListener('fetch', (event) => {
  console.log('[ServiceWorker] Fetch', event.request.url);
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});
