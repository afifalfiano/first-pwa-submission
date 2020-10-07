const CACHE_NAME = "Portfolio-v1";

var urlsToCache = [
    "/",
    "/nav.html",
    "/index.html",
    "/page/about.html",
    "/page/home.html",
    "/page/contact.html",
    "/page/project.html",
    "js/nav.js",
    "css/materialize.min.css",
    "js/materialize.min.js",
    "css/font-awesome.css"
];

self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(urlsToCache);
        })
    )
})

self.addEventListener("fetch", function(event) {
    event.respondWith(
        caches
        .match(event.request, {cacheNames: CACHE_NAME})
        .then(function(response) {
            if (response) {
                console.log("Service Worker gunakan aset dari cache: ", response.url );
                return response;
            }

            console(
                "service worker memuat aset dari server",
                event.request.url
            );
            return fetch(event.request.url);
        })
    )
})

self.addEventListener("activate", function(event) {
    event.waitUntil(
        caches.keys()
        .then(
            function(cacheNames) {
                return Promise.all(
                    cacheNames.map(function(cacheName) {
                        if (cacheName != CACHE_NAME) {
                            console.log("Service worker: cache" + cacheName + " dihapus");
                            return caches.delete(cacheName);
                        }
                    })
                )
            }
        )
    )
})