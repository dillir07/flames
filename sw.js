// put this file in root to intercept requests for resources
// in other folders as well.

self.addEventListener("install", e => {
    e.waitUntil(
        caches.open('static').then(cache => {
            return cache.addAll([
                "./", // this refers to index.html file
                "./vue.js",
                "./style.css",
                "./w3.css",
                "./script.js"
            ]);
        }).catch()
    );
    console.info("ServiceWorker installed now");
});

self.addEventListener("fetch", e => {
    console.info("fetch", e.request.url);
    e.respondWith(
        caches.match(e.request).then(response => {
            return response || fetch(e.request);
        }
        ).catch(error => {
            console.warn(error);
        })
    )
});