//imports
importScripts('assets/js/sw-utils.js');

const STATIC_CACHE = 'static_v1';
const DYNAMIC_CACHE = 'dynamic_v1';
const INMUTABLE_CACHE = 'inmutable_v1';

const APP_SHELL = [
    'index.html',
    'index1.html',
    'about.html',
    'blog.html',
    'contact.html',
    'post-details.html',
    'assets/css/fontawesome.css',
    'assets/css/templatemo-stand-blog.css',
    'assets/css/owl.css',
    'assets/images/about-us.jpg',
    'assets/images/banner-item-01.jpg',
    'assets/images/banner-item-02.jpg',
    'assets/images/banner-item-03.jpg',
    'assets/images/banner-item-04.jpg',
    'assets/images/banner-item-05.jpg',
    'assets/images/banner-item-06.jpg',
    'assets/images/blog-post-01.jpg',
    'assets/images/blog-post-02.jpg',
    'assets/images/blog-post-03.jpg',
    'assets/images/blog-thumb-01.jpg',
    'assets/images/blog-thumb-02.jpg',
    'assets/images/blog-thumb-03.jpg',
    'assets/images/blog-thumb-04.jpg',
    'assets/images/blog-thumb-05.jpg',
    'assets/images/blog-thumb-06.jpg',
    'assets/images/comment-author-01.jpg',
    'assets/images/comment-author-02.jpg',
    'assets/images/comment-author-03.jpg',
    'assets/images/cta-bg.jpg',
    'assets/images/heading-bg.jpg',
    'assets/js/app.js',
    'vendor/jquery/jquery.min.js',
    'assets/js/sw-utils.js',
    'assets/js/custom.js',
    'assets/js/owl.js',
    'assets/js/slick.js',
    'assets/js/isotope.js',
    'assets/js/accordions.js',
    'assets/js/libs/plugins/mdtoast.min.js',
    'assets/js/libs/plugins/mdtoast.min.css'

];

const APP_SHELL_INMUTABLE = [
    'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js',
    'vendor/bootstrap/css/bootstrap.min.css',
    'vendor/bootstrap/js/bootstrap.bundle.min.js',
    'https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i&display=swap',

];

self.addEventListener('install',e=>{
    const cacheStatic = caches.open(STATIC_CACHE).then(cache=>
        cache.addAll(APP_SHELL));
    const cacheInmutable = caches.open(INMUTABLE_CACHE).then(cache=>
        cache.addAll(APP_SHELL_INMUTABLE));
    e.waitUntil(Promise.all([cacheStatic,cacheInmutable]));
});

self.addEventListener('activate', e=>{
    const respuesta=caches.keys().then(keys=>{
        keys.forEach(key=>{
        if(key!=STATIC_CACHE && key.includes('estatic')){
            return caches.delete(key);
        }
        });
    });
    e.waitUntil(respuesta);
});

self.addEventListener('fetch', e=>{
    const respuesta = caches.match(e.request).then(resp=>{
            if(resp){
                return resp;
            }else{
                return fetch(e.request).then(newResp=>{
                    return actualizaCacheDinamico(DYNAMIC_CACHE,e.request,newResp);
                })
            }
        });
        e.respondWith(respuesta);
});

 //tareas asincronas
 self.addEventListener('sync',e=>{
    console.log('SW:Sync');
    if(e.tag === 'nuevo-post'){
        //postear a DB cuando hay conexion
        e.waitUntil();
    }
});
