// // vue.config.js
// module.exports = {
//     devServer: {
//       overlay: false
//     }
//   }

module.exports = {
    lintOnSave: false,
    pwa: {
        workboxPluginMode: 'GenerateSW',
        workboxOptions: {
            navigateFallback: '/index.html',
            runtimeCaching: [
                {
                    urlPattern: new RegExp('^http://127.0.0.1:8887/'),
                    handler: 'networkFirst',
                    options: {
                        networkTimeoutSeconds: 20,
                        cacheName: 'api-cache',
                        cacheableResponse: {
                            statuses: [0, 200]
                        }
                    }
                }
            ]
        }
    }
};