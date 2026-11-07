const CACHE_NAME = 'freccette-v1';

const RISORSE = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  'https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;800;900&display=swap'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(RISORSE))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(chiavi => Promise.all(
      chiavi.map(chiave => {
        if (chiave !== CACHE_NAME) return caches.delete(chiave);
      })
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(risposta => risposta || fetch(event.request))
  );
});

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});