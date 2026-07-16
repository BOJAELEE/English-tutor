const CACHE = "et-v3";
const ASSETS = [
  "./", "index.html", "style.css", "app.js", "patterns.js", "day-tasks.js",
  "push-config.js", "manifest.json", "icon-192.png", "icon-512.png",
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
  );
  self.clients.claim();
});

// 같은 출처: 항상 서버와 대조(no-cache)해 최신 코드 우선, 오프라인이면 캐시 사용. API 호출은 그대로 통과.
self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return;
  e.respondWith(
    fetch(e.request, { cache: "no-cache" })
      .then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy));
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});

self.addEventListener("push", e => {
  let data = { title: "영어회화 연습 시작", body: "영어회화 연습 시작" };
  try { if (e.data) data = e.data.json(); } catch {}
  e.waitUntil(
    self.registration.showNotification(data.title || "영어회화 연습 시작", {
      body: data.body || "영어회화 연습 시작",
      icon: "icon-192.png",
      badge: "icon-192.png",
    })
  );
});

self.addEventListener("notificationclick", e => {
  e.notification.close();
  e.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(clientList => {
      for (const client of clientList) {
        if ("focus" in client) {
          client.postMessage({ type: "autostart" });
          return client.focus();
        }
      }
      if (self.clients.openWindow) {
        return self.clients.openWindow("./index.html?autostart=1");
      }
    })
  );
});
