const version = 1;
const preCacheName = `static-${version}`;
const precache = [
	'/',
	'/fonts/Hangyaboly.ttf',
	'/fonts/SourceSerifPro-Regular.ttf',
	'/index.html',
	'/mali-olimpijac.html',
	'/mali-avanturist.html',
	'/kondicijska-priprema.html',
	'/djecja-kineziterapija.html',
	'/img/logo.png',
	'/img/coaches/160x160/dario-160x160.jpg',
	'/img/coaches/160x160/ivan-160x160.jpg',
	'/img/coaches/160x160/ivana-160x160.jpg',
	'/img/coaches/160x160/matija-1-160x160.jpg',
	'/img/coaches/160x160/matija-2-160x160.jpeg',
	'/img/coaches/160x160/matija-3-160x160.jpg',
	'/img/coaches/160x160/mirela-160x160.jpg',
	'/img/coaches/160x160/zoran-160x160.jpg',
	'/img/icons/address-icon.png',
	'/img/icons/facebook-icon.png',
	'/img/icons/instagram-icon.png',
	'/img/icons/mail-icon.png',
	'/img/icons/phone-icon.png',
	'/img/thumb/asset-1.jpeg',
	'/img/thumb/asset-2.jpeg',
	'/img/thumb/asset-3.jpeg',
	'/img/thumb/asset-4.jpeg',
	'/img/thumb/asset-5.jpeg',
	'/img/thumb/asset-6.jpeg',
	'/img/thumb/asset-7.jpeg',
	'/img/thumb/asset-8.jpeg',
	'/img/thumb/asset-9.jpeg',
	'/img/thumb/asset-10.jpeg',
	'/img/thumb/asset-11.jpeg',
	'/img/thumb/asset-12.jpeg',
	'/img/thumb/asset-13.jpeg',
	'/img/thumb/asset-14.jpeg',
	'/img/thumb/asset-15.jpeg',
	'/img/thumb/asset-16.jpeg',
	'/img/thumb/asset-17.jpeg',
	'/img/thumb/asset-18.jpeg',
	'/img/thumb/asset-19.jpeg',
	'/img/thumb/asset-20.jpeg',
	'/img/thumb/asset-21.jpeg',
	'/img/thumb/asset-22.jpeg',
	'/img/thumb/asset-23.jpeg',
	'/img/thumb/asset-24.jpeg',
	'/img/thumb/asset-25.jpeg',
	'/img/thumb/asset-26.jpeg',
	'/img/thumb/asset-27.jpeg',
	'/img/thumb/asset-28.jpeg',
	'/img/thumb/asset-29.jpeg',
	'/img/thumb/asset-30.jpeg',
	'/img/thumb/asset-31.jpeg',
	'/img/thumb/asset-32.jpeg',
	'/img/thumb/asset-33.jpeg',
	'/img/thumb/asset-34.jpeg',
	'/img/thumb/asset-35.jpeg',
	'/img/thumb/asset-36.jpeg',
	'/img/thumb/asset-37.jpeg',
	'/img/thumb/asset-38.jpeg',
	'/img/thumb/asset-39.jpeg',
	'/img/thumb/asset-40.jpeg',
	'/img/thumb/asset-41.jpeg',
	'/img/thumb/asset-42.jpeg',
];
//if you add '/404.html' to the precache, the file must exist or the install event will fail

self.addEventListener('install', (e) => {
	//installed
	e.waitUntil(
		caches
			.open(preCacheName)
			.then((cache) => {
				console.log('caching the static files');
				cache.addAll(precache);
			})
			.catch(console.warn),
	);
	//load pre-cache
});

self.addEventListener('activate', (e) => {
	//activating
	e.waitUntil(
		caches
			.keys()
			.then((keys) => {
				return Promise.all(
					keys
						.filter((key) => key !== preCacheName)
						.map((key) => caches.delete(key)),
				);
			})
			.catch(console.warn),
	);
	//delete old caches
});

self.addEventListener('fetch', (e) => {
	//fetch request received
	//send back a response from cache or fetch
	e.respondWith(
		caches.match(e.request).then((cacheRes) => {
			return (
				cacheRes ||
				fetch(e.request).then(
					(response) => {
						return response;
					},
					(err) => {
						// added by me
						console.log(
							'[Service Worker] Fetch failed; returning offline page instead.',
							err,
						);

						return precache;
						//in case of network failure, send precache
					},
				)
			);
		}),
	);
});

self.addEventListener('message', (e) => {
	//message received
	//do things based on message props
	let data = e.data;
	console.log('SW received', data);
});

const sendMessage = async (msg) => {
	let allClients = await clients.matchAll({ includeUncontrolled: true });
	return Promise.all(
		allClients.map((client) => {
			let channel = new MessageChannel();
			return client.postMessage(msg);
		}),
	);
};

// PERIODIC SYNC
self.addEventListener('periodicsync', (e) => {
	if (e.tag == 'latest-update') {
		e.waitUntil(fetchAndCacheLatestUpdate());
	}
});
