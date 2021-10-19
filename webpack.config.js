const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')



module.exports = {
    entry: {
        index: './src/index.js',
        action: './src/action.js',
        reservation: './src/reservation.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    plugins: [
        new HtmlWebPackPlugin({
            title: 'Nuki Progressive Web App'
        }),
        new WorkboxPlugin.InjectManifest({
            swSrc: './src/sw.js',
          }),
        new WebpackPwaManifest({
            name: 'Nuki Progressive Web App',
            short_name: 'Nuki PWA',
            description: 'Progressive Web App to control the nuki smartlock!',
            background_color: '#fff',
            crossorigin: 'use-credentials',
            publicPath: './',
            icons: [
                {
                    src: path.resolve('src/assets/icon.png'),
                    sizes: [96, 128, 192, 256, 384, 512]
                },
                {
                  src: path.resolve('src/assets/maskable-1024.png'),
                  size: '1024x1024' 
                },
                {
                  src: path.resolve('src/assets/maskable-1024.png'),
                  size: '1024x1024',
                  purpose: 'maskable'
                }
            ]
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ]
    },
    mode: "development"
}