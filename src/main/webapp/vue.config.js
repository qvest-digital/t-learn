const path = require('path');
module.exports = {
    pages: {
        index: {
            entry: 'src/main.js',
            title: 't-learn'
        }
    },
    chainWebpack: config => {
        config.module
            .rule('vue')
            .use('vue-loader')
            .loader('vue-loader')
            .tap(options => {
                options.transformAssetUrls = {
                    img: 'src',
                    image: 'xlink:href',
                    'b-avatar': 'src',
                    'b-img': 'src',
                    'b-img-lazy': ['src', 'blank-src'],
                    'b-card': 'img-src',
                    'b-card-img': 'src',
                    'b-card-img-lazy': ['src', 'blank-src'],
                    'b-carousel-slide': 'img-src',
                    'b-embed': 'src'
                };

                return options;
            });
    },
    css: {
        loaderOptions: {
            sass: {
                additionalData: `@import "@/assets/styles/styles.scss";`
            }
        }
    },
    publicPath: './',
    devServer: {
        proxy: 'http://localhost:8080'
    }
};
