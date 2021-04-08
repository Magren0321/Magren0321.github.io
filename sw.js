//监听service worker事件
self.addEventListener('install', function (event) {
    var homePage = new Request('index.html');
    event.waitUntil(
        //请求首页并将首页存入缓存
        fetch(homePage).then(function (response) {
            //建立cache-homePage缓存
            return caches.open('cache-homePage').then(function (cache) {
                return cache.put(homePage, response);
            });
        }));
});

//请求页面
self.addEventListener('fetch', function (event) {
    event.respondWith(
        fetch(event.request).catch(function (error) {
            //请求失败，从缓存中读取缓存的页面
            return caches.open('cache-homePage').then(function (cache) {
                return cache.match('index.html');
            });
        }));
});

//刷新首页
self.addEventListener('refreshHomePage', function (response) {
    return caches.open('cache-homePage').then(function (cache) {
        //将刷新后的页面缓存
        return cache.put(offlinePage, response);
    });
});
