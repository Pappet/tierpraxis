// Nach JEDER Änderung hochzählen, sonst liefert der Worker die alte Fassung aus.
const VERSION = 'v4';
const CACHE = `tierpraxis-${VERSION}`;
const SHELL = [
  './', './index.html', './manifest.webmanifest',
  './icons/icon-192.png', './icons/icon-512.png', './icons/icon-512-maskable.png',
  './icons/icon-180.png', './icons/favicon-32.png',
  // Bilder (fehlen sie, zeichnet das Spiel selbst)
  './assets/hund-normal.webp',
  './assets/hund-traurig.webp',
  './assets/hund-krank.webp',
  './assets/hund-froh.webp',
  './assets/hund-hops.webm',
  './assets/katze-normal.webp',
  './assets/katze-traurig.webp',
  './assets/katze-krank.webp',
  './assets/katze-froh.webp',
  './assets/katze-hops.webm',
  './assets/pony-normal.webp',
  './assets/pony-traurig.webp',
  './assets/pony-krank.webp',
  './assets/pony-froh.webp',
  './assets/pony-hops.webm',
  './assets/hase-normal.webp',
  './assets/hase-traurig.webp',
  './assets/hase-krank.webp',
  './assets/hase-froh.webp',
  './assets/hase-hops.webm',
  './assets/einhorn-normal.webp',
  './assets/einhorn-traurig.webp',
  './assets/einhorn-krank.webp',
  './assets/einhorn-froh.webp',
  './assets/einhorn-hops.webm',
  './assets/o-schlamm.webp',
  './assets/o-schaum.webp',
  './assets/o-tropfen.webp',
  './assets/o-dorn.webp',
  './assets/o-nagel.webp',
  './assets/o-pflaster.webp',
  './assets/o-wunde.webp',
  './assets/o-salbe.webp',
  './assets/o-knoten.webp',
  './assets/t-schlamm.webp',
  './assets/t-schaum.webp',
  './assets/t-nass.webp',
  './assets/t-zottel.webp',
  './assets/o-krallen-lang.webp',
  './assets/o-krallen-kurz.webp',
  './assets/bg-warte.webp',
  './assets/bg-raum.webp'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => Promise.allSettled(SHELL.map(f => c.add(f)))));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    for(const k of await caches.keys()) if(k !== CACHE) await caches.delete(k);
    await self.clients.claim();
  })());
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if(req.method !== 'GET') return;
  const url = new URL(req.url);
  const isFont = url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com';
  if(url.origin !== self.location.origin && !isFont) return;
  e.respondWith((async () => {
    const hit = await caches.match(req, {ignoreSearch: req.mode === 'navigate'});
    if(hit) return hit;
    try{
      const res = await fetch(req);
      if(res.ok || res.type === 'opaque') (await caches.open(CACHE)).put(req, res.clone());
      return res;
    }catch(err){
      if(req.mode === 'navigate') return (await caches.match('./index.html')) || Response.error();
      return Response.error();
    }
  })());
});
