const CACHE_NAME = 'v0.1.38';
const urlsToCache = [
  '/',
  '/favicon.png',
 
  // Add other URLs and assets as needed
];
/*
  '/index.html',
  '/manifest.json',
  '/PrimeSites.otf',
  '/robots.txt',
  '/script.js',
  '/style.css',
  '/whip-custom.js',
  '/assets/css/animate.css',
  '/assets/css/perfect-scrollbar.min.css',
  '/assets/css/style.css', // Ensure this is the compiled CSS
  '/assets/images/WhipPass-Image-001.jpg',
  '/assets/js/alpine.min.js',
  '/assets/js/clipboard.min.js',
  '/assets/js/custom.js',
  '/assets/js/perfect-scrollbar.min.js',
  '/assets/js/popper.min.js',
  */

  self.addEventListener('install', event => {
    event.waitUntil(
      caches.open(CACHE_NAME)
        .then(cache => {
          console.log('Opened cache');
          return cache.addAll(urlsToCache.map(url => `${url}?update=${Date.now()}`))
            .catch(error => {
              console.error('Failed to cache:', error);
            });
        })
    );
  });
  
  self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (!cacheWhitelist.includes(cacheName)) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });
  
  self.addEventListener('fetch', event => {
    const requestUrl = new URL(event.request.url);
    // Remove the update query parameter for cache matching
    requestUrl.searchParams.delete('update');
  
    event.respondWith(
      caches.match(requestUrl)
        .then(response => {
          if (response) {
            return response;
          }
          return fetch(event.request).then(
            networkResponse => {
              if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
                return networkResponse;
              }
              const responseToCache = networkResponse.clone();
              caches.open(CACHE_NAME)
                .then(cache => {
                  cache.put(requestUrl, responseToCache);
                });
              return networkResponse;
            }
          ).catch(error => {
            console.error('Fetch failed:', error);
          });
        })
    );
  });

/*
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request).catch(() => {
          return caches.match('/index.html');
        });
      })
  );
});
*/