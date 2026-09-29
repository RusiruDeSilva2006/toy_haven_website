// Simple service worker for the Toy Haven PWA.
self.addEventListener("install", function (event) {
    self.skipWaiting();
});

self.addEventListener("fetch", function (event) {
    // Keep normal browser loading for this beginner project.
});
