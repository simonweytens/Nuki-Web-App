import {precacheAndRoute} from 'workbox-precaching';
// Optional: use the injectManifest mode of one of the Workbox
// build tools to precache a list of URLs, including fallbacks.
precacheAndRoute(self.__WB_MANIFEST);

console.log('hello')