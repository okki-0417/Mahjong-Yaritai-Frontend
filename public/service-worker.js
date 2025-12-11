const CACHE_NAME = "mahjong-yaritai-v1";
const API_CACHE_NAME = "mahjong-yaritai-api-v1";

// キャッシュする静的リソース
const STATIC_ASSETS = [
  "/",
  "/manifest.json",
  "/mahjong-icon.webp",
  "/logo.webp",
  "/no-image.webp",
  "/main-visual.webp",
  "/beginner-icon.webp",
  "/vote-icon-default.webp",
  "/vote-icon-blue.webp",
];

// Service Workerのインストール
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(STATIC_ASSETS);
    }),
  );
  // 新しいService Workerを即座にアクティブ化
  self.skipWaiting();
});

// 古いキャッシュの削除
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME && cacheName !== API_CACHE_NAME) {
            return caches.delete(cacheName);
          }
        }),
      );
    }),
  );
  // すべてのクライアントを即座に制御
  return self.clients.claim();
});

// フェッチイベントの処理
self.addEventListener("fetch", event => {
  const { request } = event;
  const url = new URL(request.url);

  // APIリクエストの場合: Network First戦略
  if (url.origin === self.location.origin && url.pathname.startsWith("/api")) {
    event.respondWith(
      fetch(request)
        .then(response => {
          // レスポンスをクローンしてキャッシュに保存
          const responseClone = response.clone();
          caches.open(API_CACHE_NAME).then(cache => {
            cache.put(request, responseClone);
          });
          return response;
        })
        .catch(() => {
          // ネットワークエラー時はキャッシュから返す
          return caches.match(request);
        }),
    );
    return;
  }

  // 外部APIリクエストの場合: Network First戦略
  if (url.hostname.includes("localhost") && url.port === "3001") {
    event.respondWith(
      fetch(request)
        .then(response => {
          const responseClone = response.clone();
          caches.open(API_CACHE_NAME).then(cache => {
            cache.put(request, responseClone);
          });
          return response;
        })
        .catch(() => {
          return caches.match(request);
        }),
    );
    return;
  }

  // 静的リソースの場合: Cache First戦略
  event.respondWith(
    caches.match(request).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(request).then(response => {
        // 有効なレスポンスのみキャッシュ
        if (!response || response.status !== 200 || response.type === "error") {
          return response;
        }

        const responseClone = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(request, responseClone);
        });

        return response;
      });
    }),
  );
});

// バックグラウンド同期（オプション）
self.addEventListener("sync", event => {
  if (event.tag === "sync-data") {
    event.waitUntil(syncData());
  }
});

async function syncData() {
  // バックグラウンドでのデータ同期処理
  console.log("Background sync triggered");
}

// プッシュ通知（オプション）
self.addEventListener("push", event => {
  const options = {
    body: event.data ? event.data.text() : "新しい通知があります",
    icon: "/mahjong-icon.webp",
    badge: "/mahjong-icon.webp",
    vibrate: [200, 100, 200],
  };

  event.waitUntil(self.registration.showNotification("麻雀ヤリタイ", options));
});

// 通知クリック時の処理
self.addEventListener("notificationclick", event => {
  event.notification.close();
  event.waitUntil(clients.openWindow("/"));
});
