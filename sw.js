// ParkLog service worker: makes the app open and run with no connection.
// When you publish a new version, change VERSION so everyone's copy updates.
const VERSION = '2026.10.19-24';
const CACHE = 'pota-logger-' + VERSION;
const APP_FILES = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(c => c.addAll(APP_FILES)));
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    for(const key of await caches.keys()) if(key.startsWith('pota-logger-') && key !== CACHE) await caches.delete(key);
    await self.clients.claim();
  })());
});

self.addEventListener('message', event => { if(event.data === 'skipWaiting') self.skipWaiting(); });

self.addEventListener('fetch', event => {
  const req = event.request;
  if(req.method !== 'GET') return;
  const url = new URL(req.url);

  // The app page: use the saved copy right away (fast and works offline).
  if(req.mode === 'navigate'){
    event.respondWith(caches.match('./index.html').then(hit => hit || fetch(req)));
    return;
  }
  // App files: saved copy first, network if missing.
  if(url.origin === location.origin){
    event.respondWith(caches.match(req).then(hit => hit || fetch(req)));
    return;
  }
  // Google Fonts: keep a copy the first time so the look survives offline.
  if(url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com'){
    event.respondWith(caches.open(CACHE).then(async c => {
      const hit = await c.match(req);
      if(hit) return hit;
      try{ const res = await fetch(req); if(res.ok || res.type === 'opaque') c.put(req, res.clone()); return res; }
      catch(e){ return hit || Response.error(); }
    }));
  }
});
