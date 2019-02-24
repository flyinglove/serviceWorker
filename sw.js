const VERSION_NAME = 'v2'
self.addEventListener('install', function(event) {
    let urlsToCache = [
        '/',
        'js/',
        'css/',
        'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
        'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js',
        'https://unpkg.com/leaflet@1.3.1/dist/images/marker-icon.png',
        'https://unpkg.com/leaflet@1.3.1/dist/images/marker-shadow.png',
        'img/'
    ]
    console.log('install')
    event.waitUntil(
        caches.open(VERSION_NAME).then(function (cache) {
            return cache.addAll(urlsToCache)
        })
    )
})
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            if (response) {
                return response
            } else {
                return fetch(event.request)
            }
        })
    )
})