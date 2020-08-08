const CACHE_NAME = "version-1";
const urlsToCache = ['index.html', 'offline.html'];

const self = this;

// Event for installation. Installs service worker

// Takes in type of event, and function that will be executed
// after event. 
self.addEventListener('install', (event) => {
	event.waitUntill(
		caches.open(CACHE_NAME)
		.then((cache) => {
			return cache.addAll(urlsToCache);
		})
	);
});

// Listens for requests

// When fetching something, match all the requests that are pages
// like requests to show an image, request to show api call, etc, ...
// then for all the request, fetch then again. If you cannot fetch
// then, that means there is no internet connection so just return
// the offline.html
self.addEventListener('fetch', (event) => {
	event.respondWith(
		caches.match(event.request)
		.then(() => {
			return fetch(event.request)
					.catch(() => caches.match('offline.html'));
		}));
});


// Activate the service worker

// There will be lots of versions for the caches and often
// we do not use them all. Do not want to store them all so
// want to remove all previous caches and just keep the newest
// one. Whenever there is an update, only version-1 is kept.
self.addEventListener('activate', (event) => {
	const cacheWhiteList = [];
	cacheWhiteList.push(CACHE_NAME);

	// If cacheWhiteList does not include the cacheName, delete
	// the cache.
	event.waitUntill(
		caches.keys().then((cacheNames) => Promise.all(
			cacheNames.map((cacheName) => {
				if(!cacheWhiteList.includes(cacheName)) {
					return caches.delete(cacheName);
				}
			})
		))
	);
});