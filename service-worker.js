const CACHE_NAME = "portfolio-v3";

var urlsToCache = [
    "/",
    "/nav.html",
    "/index.html",
    "/pages/about.html",
    "/pages/home.html",
    "/pages/contact.html",
    "/pages/project.html",
    "/css/font-awesome/fontawesome-webfont.eot",
    "/css/font-awesome/fontawesome-webfont.svg",
    "/css/font-awesome/fontawesome-webfont.ttf",
    "/css/font-awesome/fontawesome-webfont.woff",
    "/css/font-awesome/fontawesome-webfont.woff2",
    "/css/font-awesome/FontAwesome.otf",
    "/css/font-awesome/font-awesome.css",
    "/css/font-awesome/font-awesome.min.css",
    "/css/materialize.min.css",
    "/js/materialize.min.js",
    "/js/nav.js",
    "/img/myprofile.jpg",
    "/img/carousel1.jpg",
    "/img/carousel2.jpg",
    "/img/carousel3.jpg",
    "/img/map-city.jpg",
    "/img/social_media/github.png",
    "/img/social_media/instagram.png",
    "/img/social_media/twitter.png",
    "/img/social_media/medium.png",
    "/img/project/image1.jpg",
    "/img/project/image2.jpg",
    "/img/project/image3.jpg",
    "/img/project/image4.jpg",
    "/img/project/image5.jpg",
    "/img/project/image6.jpg",
    "/manifest.json",
    "/icon.png",
    "/apple-touch-icon.png",
    "/icon-512x512.png"
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
        .match(event.request, {cacheName: CACHE_NAME})
        .then(function(response) {
            if (response) {
                console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
                return response;
            }

            console.log(
                "ServiceWorker: Memuat aset dari server: ",
                event.request.url
            );
            return fetch(event.request);
        })
    )
})

self.addEventListener("activate", function(event) {
    event.waitUntil(
        caches.keys()
        .then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName != CACHE_NAME) {
                        console.log("ServiceWorker: cache " + cacheName + " dihapus");
                        return caches.delete(cacheName);
                    }
                })
            )
        }
    ))
})