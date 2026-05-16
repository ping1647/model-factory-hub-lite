const CACHE_NAME = 'model-factory-hub-lite-v1';
const ASSETS = ['./', './index.html', './styles.css', './app.js', './data.js', './manifest.json'];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)).catch(() => null));
});
self.addEventListener('fetch', event => {
  event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
});
