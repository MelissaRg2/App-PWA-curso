// Asignar un nombre y versión al cache
const CACHE_NAME = "v2_cache_helado";
const urlsToCache = [
  "./",
  "https://fonts.googleapis.com/css?family=Raleway:400,700",
  "https://fonts.gstatic.com/s/raleway/v12/1Ptrg8zYS_SKggPNwJYtWqZPAA.woff2",
  "https://use.fontawesome.com/releases/v5.0.7/css/all.css",
  "https://use.fontawesome.com/releases/v5.0.6/webfonts/fa-brands-400.woff2",
  "./style.css",
  "./script.js",
  "./index.html",
  "./about.html",
  "./product.html",
  "./service.html",
  "./gallery.html",
  "./contact.html",
  "./img/favicon.png",
  "./img/favicon.ico",
  "./img/about.jpg",
  "./img/carousel-1.jpg",
  "./img/carousel-2.jpg",
  "./img/header.jpg",
  "./img/portfolio-1.jpg",
  "./img/portfolio-2.jpg",
  "./img/portfolio-3.jpg",
  "./img/portfolio-4.jpg",
  "./img/portfolio-5.jpg",
  "./img/portfolio-6.jpg",
  "./img/product-1.jpg",
  "./img/product-2.jpg",
  "./img/product-3.jpg",
  "./img/product-4.jpg",
  "./img/promotion.jpg",
  "./img/service-1.jpg",
  "./img/service-2.jpg",
  "./img/service-3.jpg",
  "./img/service-4.jpg",
  "./img/team-1.jpg",
  "./img/team-2.jpg",
  "./img/team-3.jpg",
  "./img/team-4.jpg",
  "./img/testimonial-1.jpg",
  "./img/testimonial-2.jpg",
  "./img/testimonial-3.jpg",
  "./lib/owlcarousel/assets/owl.carousel.min.css",
  "./lib/lightbox/css/lightbox.min.css",
  "./css/style.css",
  "./js/main.js",
  "./mail/jqBootstrapValidation.min.js",
  "./mail/contact.js",
  "./manifest.json",  // Se actualiza la ruta del manifest
];

// Durante la fase de instalación, se almacenan en caché los activos estáticos
self.addEventListener('install', e => {
  e.waitUntil(
      caches.open(CACHE_NAME)
          .then(cache => {
              return cache.addAll(urlsToCache)
                  .then(() => self.skipWaiting())  // Forzamos que el SW se active inmediatamente
                  .catch(error => {
                      console.error('Error al agregar al cache:', error);
                      // Si es necesario, agrega más detalles de depuración aquí.
                  });
          })
          .catch(err => console.log('Falló registro de cache', err))
  );
});


// Una vez que se instala el SW, se activa y limpia el cache viejo
self.addEventListener('activate', e => {
    const cacheWhitelist = [CACHE_NAME];
  
    e.waitUntil(
      caches.keys()
        .then(cacheNames => {
          return Promise.all(
            cacheNames.map(cacheName => {
              if (cacheWhitelist.indexOf(cacheName) === -1) {
                return caches.delete(cacheName);
              }
            })
          );
        })
        .then(() => self.clients.claim())
    );
});

// Manejar las solicitudes de red
self.addEventListener('fetch', e => {
    e.respondWith(
      caches.match(e.request)
        .then(res => {
          if (res) {
            return res; // Recuperar del cache
          }
          return fetch(e.request); // Recuperar de la red
        })
    );
});
