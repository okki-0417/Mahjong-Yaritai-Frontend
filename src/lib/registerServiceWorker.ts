/* eslint-disable no-console */

export function registerServiceWorker() {
  if (typeof window !== "undefined" && "serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then(registration => {
          console.log("Service Worker registered successfully:", registration.scope);

          // 更新チェック
          registration.addEventListener("updatefound", () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener("statechange", () => {
                if (newWorker.state !== "installed" || !navigator.serviceWorker.controller) return;

                // 新しいコンテンツが利用可能
                console.log("New content is available; please refresh.");

                // オプション: ユーザーに通知
                if (window.confirm("新しいバージョンが利用可能です。ページを更新しますか？")) {
                  window.location.reload();
                }
              });
            }
          });
        })
        .catch(error => {
          console.error("Service Worker registration failed:", error);
        });
    });
  }
}

export function unregisterServiceWorker() {
  if (typeof window !== "undefined" && "serviceWorker" in navigator) {
    navigator.serviceWorker.ready
      .then(registration => {
        registration.unregister();
      })
      .catch(error => {
        console.error("Service Worker unregistration failed:", error);
      });
  }
}
