/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["C:/Work/Blog/NewHexo/public/404.html","64a18a051612d405ffa041b26bec57b0"],["C:/Work/Blog/NewHexo/public/Git-tutorial.html","e80c9e5d1b498ee38fc95f7f4718fbb6"],["C:/Work/Blog/NewHexo/public/archives/2019/07/index.html","926f677c4eed4133d0b29516d247d083"],["C:/Work/Blog/NewHexo/public/archives/2019/09/index.html","da75207745df7b3f2829e61fe71d6747"],["C:/Work/Blog/NewHexo/public/archives/2019/11/index.html","a92859d6b351fd98080056660bdfff98"],["C:/Work/Blog/NewHexo/public/archives/2019/index.html","7f265689d446ad0b0b0aee5c883e680e"],["C:/Work/Blog/NewHexo/public/archives/2020/07/index.html","2b3650ec4b88c66f8963df9f0e08582d"],["C:/Work/Blog/NewHexo/public/archives/2020/index.html","acae3dafad07cb6f02525892dd00c67c"],["C:/Work/Blog/NewHexo/public/archives/index.html","1b827a984031a2bc6bd551d585ae6546"],["C:/Work/Blog/NewHexo/public/categories/Deep-Learning/index.html","a815e1667aba7a4b8728152f6516a397"],["C:/Work/Blog/NewHexo/public/categories/Git/index.html","191fc85cebedf04d29f0f8ed2dceea99"],["C:/Work/Blog/NewHexo/public/categories/Machine-Learning/index.html","fed37859fa3cbc8794d748f5d2852af1"],["C:/Work/Blog/NewHexo/public/categories/index.html","b2c3e516bffdb691d788723f8d9046d4"],["C:/Work/Blog/NewHexo/public/classification-metrics.html","8a69984c2c33362e9de2e88831ca8c14"],["C:/Work/Blog/NewHexo/public/css/index.css","825a336221f889fa8072579675ce8784"],["C:/Work/Blog/NewHexo/public/css/var.css","d41d8cd98f00b204e9800998ecf8427e"],["C:/Work/Blog/NewHexo/public/decision-tree.html","1c87c264712c9a7fb78ceab8588cd309"],["C:/Work/Blog/NewHexo/public/deeplearning-workstation.html","9652a85df0ce641b5fa01b607eda590c"],["C:/Work/Blog/NewHexo/public/hello-world.html","2b398ce5cb41839ce258fac90d578454"],["C:/Work/Blog/NewHexo/public/img/404.jpg","4ef3cfb882b6dd4128da4c8745e9a507"],["C:/Work/Blog/NewHexo/public/img/algolia.svg","88450dd56ea1a00ba772424b30b7d34d"],["C:/Work/Blog/NewHexo/public/img/alipay.jpg","92b87555fe82a2fcefa1014bdf2d3904"],["C:/Work/Blog/NewHexo/public/img/avatar.jpg","b9b0afb857df7c4f315c5b60a9e9d1ef"],["C:/Work/Blog/NewHexo/public/img/favicon.png","7a8c47cb5a2149c1a1af21e90ecd9ca7"],["C:/Work/Blog/NewHexo/public/img/friend_404.gif","68af0be9d22722e74665ef44dd532ba8"],["C:/Work/Blog/NewHexo/public/img/icp.png","6e26aed5ced63bc60524cc736611d39e"],["C:/Work/Blog/NewHexo/public/img/loading.gif","d1cf8d9ccb6a2b3514a7d14332035a3c"],["C:/Work/Blog/NewHexo/public/img/wechatpay.png","7e782c9380854eb5b36aeecf5b2ff96b"],["C:/Work/Blog/NewHexo/public/index.html","f9629f8e65b83d1eefa3808720ed1277"],["C:/Work/Blog/NewHexo/public/js/main.js","1eb3d905f8d4f15804fc050b7cd49373"],["C:/Work/Blog/NewHexo/public/js/search/algolia.js","fde9b8fefca51cc039ed4c0c2d2c34f0"],["C:/Work/Blog/NewHexo/public/js/search/local-search.js","271777e2b46e5743942ca9ac31baff15"],["C:/Work/Blog/NewHexo/public/js/third-party/ClickShowText.js","22f4c82da4faed04c79e61fcbbdf675c"],["C:/Work/Blog/NewHexo/public/js/third-party/activate-power-mode.js","e8455f75769585811cd6b3220787d08e"],["C:/Work/Blog/NewHexo/public/js/third-party/canvas-nest.js","bb643bd9c2ac59f6ce2a1251b8014624"],["C:/Work/Blog/NewHexo/public/js/third-party/canvas-ribbon.js","4ca518354a167db9fe0869c0982ff215"],["C:/Work/Blog/NewHexo/public/js/third-party/click_heart.js","c2420dfec66aa5bad663e6c365a129c8"],["C:/Work/Blog/NewHexo/public/js/third-party/fireworks.js","080fdfcacffc6828826484645140af50"],["C:/Work/Blog/NewHexo/public/js/third-party/piao.js","6df6ba5f90c4dff026fc3eea73933e8b"],["C:/Work/Blog/NewHexo/public/js/tw_cn.js","65f69c7060c833d42ffaabe5c95bb010"],["C:/Work/Blog/NewHexo/public/js/utils.js","f2f712d5d52625b377855945420eea15"],["C:/Work/Blog/NewHexo/public/link/index.html","e0f3090b2d4ec05e939e67d3b59c0940"],["C:/Work/Blog/NewHexo/public/tags/AUC/index.html","1051472bcb6ffb3b12be142ea2522243"],["C:/Work/Blog/NewHexo/public/tags/C4-5/index.html","34c118afe9ed10bd490e7ab2eb0d88ee"],["C:/Work/Blog/NewHexo/public/tags/CART树/index.html","930a08505a8f55be3875535f6a936d50"],["C:/Work/Blog/NewHexo/public/tags/DeepLearning/index.html","df67f4778bc4c6f56e38d358141f22d0"],["C:/Work/Blog/NewHexo/public/tags/F1指数/index.html","f21747a9b449afdc8831d8f6c91be5b5"],["C:/Work/Blog/NewHexo/public/tags/Git/index.html","c34bd79beccc71bf4e1c3b9ac9e233bd"],["C:/Work/Blog/NewHexo/public/tags/Git常用命令/index.html","ebb2fe1f5914013c2166e93d1337d9fe"],["C:/Work/Blog/NewHexo/public/tags/Git常用操作/index.html","2bdd36bc3220df4482fd441a4c91d0eb"],["C:/Work/Blog/NewHexo/public/tags/Git教程/index.html","eae4869c8ad999aa0303f054ded6e14f"],["C:/Work/Blog/NewHexo/public/tags/ID3/index.html","59021ebb8a6901c00be429649e0befe1"],["C:/Work/Blog/NewHexo/public/tags/P-R曲线/index.html","e979a7d22871d91f8c79b2714c70d0c5"],["C:/Work/Blog/NewHexo/public/tags/ROC/index.html","d46689f9d8d918211af9502c7db19385"],["C:/Work/Blog/NewHexo/public/tags/index.html","ff52ea81494fc6faa481380536554584"],["C:/Work/Blog/NewHexo/public/tags/信息增益/index.html","d287c1e7e319fc69af1add75c135e2fe"],["C:/Work/Blog/NewHexo/public/tags/信息熵/index.html","02cdda81ca25938d2d5526ff50628ed9"],["C:/Work/Blog/NewHexo/public/tags/决策树/index.html","7a7498b1e1e95a920774262010bb9162"],["C:/Work/Blog/NewHexo/public/tags/准确率、精确率、召回率/index.html","c10e35c80f2137eead2d2bb6070e9b1c"],["C:/Work/Blog/NewHexo/public/tags/分类算法/index.html","280309117187923aa123989d6ddaf2d3"],["C:/Work/Blog/NewHexo/public/tags/分类算法评价指标/index.html","e6b26ee82b4f49f96a1af857aad347b0"],["C:/Work/Blog/NewHexo/public/tags/剪枝/index.html","2d437aec29ea37cc6308ed6d1afa8928"],["C:/Work/Blog/NewHexo/public/tags/基尼指数/index.html","1f523983e9061e2a4d51b0cd0c770caf"],["C:/Work/Blog/NewHexo/public/tags/机器学习/index.html","304ec8a2aad3673287348a4057e99360"],["C:/Work/Blog/NewHexo/public/tags/深度学习/index.html","f676125ef32dbb577f2ef8299f0483a3"],["C:/Work/Blog/NewHexo/public/tags/评价指标/index.html","28d492a6234aeff50c352acc9e4fc4a5"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function(originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function(originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function(originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function(whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function(originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







