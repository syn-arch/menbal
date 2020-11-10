const CACHE_NAME = "menbal-v1";
const urlsToCache = [
    "/",
    "/index.html",
    "/pages/home.html",
    "/pages/match.html",
    "/pages/scores.html",
    "/pages/team.html",
    "/pages/favourite.html",
    "/css/style.css",
    "/node_modules/@fortawesome/fontawesome-free/css/all.min.css",
    "/node_modules/@fortawesome/fontawesome-free/js/all.min.js",
    "/node_modules/materialize-css/dist/css/materialize.min.css",
    "/node_modules/materialize-css/dist/js/materialize.min.js",
    "js/script.js",
    "/favicon.ico",
    "/img/ball.jpg",
    "/img/field.jpg",
    "/img/hero.jpg",
    "/img/maps.svg",
    "/img/offline.svg",
    "/img/onboard.svg",
    "/icon.png",
    "/node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2",
    "/node_modules/@fortawesome/fontawesome-free/webfonts/fa-brands-400.woff2",
    "/sw.js",
    "/manifest.json",
    "https://fonts.googleapis.com/css2?family=Poppins&display=swap",
    "/js/idb.js",
    "/js/db.js",
    "/js/api.js"
];

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                return cache.addAll(urlsToCache);
            })
    );
})

self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys()
            .then(function (cacheNames) {
                return Promise.all(
                    cacheNames.map(function (cacheName) {
                        if (cacheName != CACHE_NAME) {
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
    );
})

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request, { cacheName: CACHE_NAME })
            .then(function (response) {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});
