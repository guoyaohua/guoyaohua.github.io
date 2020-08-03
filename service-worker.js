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

var precacheConfig = [["C:/Work/Blog/NewHexo/public/404.html","8c82dfbb637aadc93fadd851bd513add"],["C:/Work/Blog/NewHexo/public/Git-tutorial.html","d5f3a621ffed404f7613fe1914072f0c"],["C:/Work/Blog/NewHexo/public/archives/2019/07/index.html","6518e820f63d246b0f8eb7b51babad3d"],["C:/Work/Blog/NewHexo/public/archives/2019/09/index.html","d5cbf303e8771056ec1bfde0c7dda7dd"],["C:/Work/Blog/NewHexo/public/archives/2019/11/index.html","8258dfe4abb4abbaeec00e3f382a9cd0"],["C:/Work/Blog/NewHexo/public/archives/2019/index.html","e32ab95004dbb0fdf9b709fb53095759"],["C:/Work/Blog/NewHexo/public/archives/2020/07/index.html","34c1d467129ab7729f1430da5bc6a64b"],["C:/Work/Blog/NewHexo/public/archives/2020/index.html","561e88cf8c50d2c515da1123ce586bcc"],["C:/Work/Blog/NewHexo/public/archives/index.html","bffac1c42d18e226dde747666f6d7b29"],["C:/Work/Blog/NewHexo/public/categories/Deep-Learning/index.html","1142022b3de894fd699c64033e2f7cac"],["C:/Work/Blog/NewHexo/public/categories/Git/index.html","605e88d11c40f1256c53ed8dad38abe7"],["C:/Work/Blog/NewHexo/public/categories/Machine-Learning/index.html","5a8681479fa4406d1137730b3d875795"],["C:/Work/Blog/NewHexo/public/categories/index.html","afad74ce4a4447664d575459feefbd9c"],["C:/Work/Blog/NewHexo/public/classification-metrics.html","0a633f90e5f32813636f2a5f1b36e19f"],["C:/Work/Blog/NewHexo/public/css/index.css","825a336221f889fa8072579675ce8784"],["C:/Work/Blog/NewHexo/public/css/var.css","d41d8cd98f00b204e9800998ecf8427e"],["C:/Work/Blog/NewHexo/public/decision-tree.html","5ae6676cb3e96fdd5b4305ce6b8785b2"],["C:/Work/Blog/NewHexo/public/deeplearning-workstation.html","f9804b076789174e6a00f8fa21c92074"],["C:/Work/Blog/NewHexo/public/img/404.jpg","4ef3cfb882b6dd4128da4c8745e9a507"],["C:/Work/Blog/NewHexo/public/img/404.png","b6a3b13589a98cad0bbc78d839d2d3c8"],["C:/Work/Blog/NewHexo/public/img/algolia.svg","88450dd56ea1a00ba772424b30b7d34d"],["C:/Work/Blog/NewHexo/public/img/alipay.jpg","92b87555fe82a2fcefa1014bdf2d3904"],["C:/Work/Blog/NewHexo/public/img/avatar.jpg","b9b0afb857df7c4f315c5b60a9e9d1ef"],["C:/Work/Blog/NewHexo/public/img/favicon.png","7a8c47cb5a2149c1a1af21e90ecd9ca7"],["C:/Work/Blog/NewHexo/public/img/friend_404.gif","68af0be9d22722e74665ef44dd532ba8"],["C:/Work/Blog/NewHexo/public/img/icp.png","6e26aed5ced63bc60524cc736611d39e"],["C:/Work/Blog/NewHexo/public/img/loading.gif","d1cf8d9ccb6a2b3514a7d14332035a3c"],["C:/Work/Blog/NewHexo/public/img/wechatpay.png","7e782c9380854eb5b36aeecf5b2ff96b"],["C:/Work/Blog/NewHexo/public/index.html","db78330ceed14fe71614e6f3b44cfa32"],["C:/Work/Blog/NewHexo/public/js/main.js","1eb3d905f8d4f15804fc050b7cd49373"],["C:/Work/Blog/NewHexo/public/js/search/algolia.js","fde9b8fefca51cc039ed4c0c2d2c34f0"],["C:/Work/Blog/NewHexo/public/js/search/local-search.js","271777e2b46e5743942ca9ac31baff15"],["C:/Work/Blog/NewHexo/public/js/third-party/ClickShowText.js","22f4c82da4faed04c79e61fcbbdf675c"],["C:/Work/Blog/NewHexo/public/js/third-party/activate-power-mode.js","e8455f75769585811cd6b3220787d08e"],["C:/Work/Blog/NewHexo/public/js/third-party/canvas-nest.js","bb643bd9c2ac59f6ce2a1251b8014624"],["C:/Work/Blog/NewHexo/public/js/third-party/canvas-ribbon.js","4ca518354a167db9fe0869c0982ff215"],["C:/Work/Blog/NewHexo/public/js/third-party/click_heart.js","c2420dfec66aa5bad663e6c365a129c8"],["C:/Work/Blog/NewHexo/public/js/third-party/fireworks.js","080fdfcacffc6828826484645140af50"],["C:/Work/Blog/NewHexo/public/js/third-party/piao.js","6df6ba5f90c4dff026fc3eea73933e8b"],["C:/Work/Blog/NewHexo/public/js/tw_cn.js","65f69c7060c833d42ffaabe5c95bb010"],["C:/Work/Blog/NewHexo/public/js/utils.js","f2f712d5d52625b377855945420eea15"],["C:/Work/Blog/NewHexo/public/link/index.html","0d02dd8d293107ecdea5c0afa3070de9"],["C:/Work/Blog/NewHexo/public/tags/AUC/index.html","c6da41517729759a612a2e9d09226c6a"],["C:/Work/Blog/NewHexo/public/tags/C4-5/index.html","75b539cb01a052791da10fb09d961aa9"],["C:/Work/Blog/NewHexo/public/tags/CART树/index.html","12e6487a4a11cc7ce96e7a4b55621045"],["C:/Work/Blog/NewHexo/public/tags/DeepLearning/index.html","6b4eb1723f83477680f41c2c6f6fcbb4"],["C:/Work/Blog/NewHexo/public/tags/F1指数/index.html","b7799048457eb6e2081b6357b3192d07"],["C:/Work/Blog/NewHexo/public/tags/Git/index.html","f3ede7251df9e26b26e1790ce0877441"],["C:/Work/Blog/NewHexo/public/tags/Git常用命令/index.html","c1d61a639382267e38c164241a4698e3"],["C:/Work/Blog/NewHexo/public/tags/Git常用操作/index.html","f4d5235c7f1941d32dec35ce4afd5185"],["C:/Work/Blog/NewHexo/public/tags/Git教程/index.html","3bd3c897ea1769c008540c33453dfdc9"],["C:/Work/Blog/NewHexo/public/tags/ID3/index.html","e4c16ccfbdc9747d29a07909a2920374"],["C:/Work/Blog/NewHexo/public/tags/P-R曲线/index.html","76831476a114be80d4e3a1a522a732f0"],["C:/Work/Blog/NewHexo/public/tags/ROC/index.html","b0f84ad9067ca199fdb42c3af2d1ec12"],["C:/Work/Blog/NewHexo/public/tags/index.html","184fad83b3cff88323cfb53dc78092c1"],["C:/Work/Blog/NewHexo/public/tags/信息增益/index.html","285516bcf073f9c35cabd985df54741f"],["C:/Work/Blog/NewHexo/public/tags/信息熵/index.html","3121988d622a300ba538d4d10a7ad1d9"],["C:/Work/Blog/NewHexo/public/tags/决策树/index.html","cdb828e9c291602a79a0677c11586b4c"],["C:/Work/Blog/NewHexo/public/tags/准确率、精确率、召回率/index.html","d2f277663b6846b9d4c37aa02f623d67"],["C:/Work/Blog/NewHexo/public/tags/分类算法/index.html","97c911800f44d19f016170b5eae09773"],["C:/Work/Blog/NewHexo/public/tags/分类算法评价指标/index.html","edf48d83ff667ee3636eba3ee331a80b"],["C:/Work/Blog/NewHexo/public/tags/剪枝/index.html","f7d0b0eef05f1cea440015a5165306a2"],["C:/Work/Blog/NewHexo/public/tags/基尼指数/index.html","23af9970b79dcaf34358e9199a40af1a"],["C:/Work/Blog/NewHexo/public/tags/机器学习/index.html","8b81668acfc9bbda639c72b8d8e1f205"],["C:/Work/Blog/NewHexo/public/tags/深度学习/index.html","09f17d4588e3e4880be8e9a4b2cb8d92"],["C:/Work/Blog/NewHexo/public/tags/评价指标/index.html","d8d516cf83bf9faaa8e15432cd7a06e0"]];
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







