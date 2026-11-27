const C='dormbill-v10';
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(['./','./manifest.json','./qrcode.js','./jsQR.js','./icon-192.png','./cat-hi.webp','./cat-happy.webp','./cat-sleep.webp','./cat-work.webp','./ic-pencil.webp','./ic-receipt.webp','./ic-chart.webp','./ic-home.webp','./ic-gear.webp','./ic-coin.webp','./ic-send.webp','./ic-bell.webp','./ic-copy.webp'])))});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const same=new URL(e.request.url).origin===location.origin;
  if(same)e.respondWith(fetch(e.request,{cache:'no-cache'}).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp));return r}).catch(()=>caches.match(e.request,{ignoreSearch:true}).then(r=>r||caches.match('./'))));
  else e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{const cp=res.clone();caches.open(C).then(c=>c.put(e.request,cp));return res})));
});
