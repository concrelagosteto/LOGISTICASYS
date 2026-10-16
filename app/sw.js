/* Service worker mínimo: permite instalar como app. Não guarda nada em cache (sempre busca a versão nova na internet);
   sem internet, mostra um aviso em vez da página de erro do navegador. */
self.addEventListener("install", function(){ self.skipWaiting(); });
self.addEventListener("activate", function(e){ e.waitUntil(self.clients.claim()); });
self.addEventListener("fetch", function(e){
  if (e.request.mode !== "navigate") return;
  e.respondWith(fetch(e.request).catch(function(){
    return new Response('<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Sem internet</title>' +
      '<body style="margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background:#070a10;color:#e8eaf0;font-family:system-ui,sans-serif;text-align:center;padding:24px">' +
      '<div><div style="font-size:42px">📶</div><h1 style="font-size:20px">Sem internet</h1><p style="color:#9aa3b2">Confira a conexão do celular e toque em tentar de novo.</p>' +
      '<button onclick="location.reload()" style="margin-top:12px;padding:12px 20px;border-radius:10px;border:0;background:#e11d48;color:#fff;font-size:16px">Tentar de novo</button></div></body>',
      { headers: { "Content-Type": "text/html; charset=utf-8" } });
  }));
});
