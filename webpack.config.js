// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const WebpackPwaManifest = require('webpack-pwa-manifest')

require('dotenv').config({ path: './.env' });

module.exports = ({ mode } = { mode: "production" }) => {

    console.log(`mode is: ${mode}`);
    //{ directory: path.join(__dirname, 'public') },
    return {
        devServer: {
            port: 3000,
            static: [

                { directory: path.resolve("build") },
                { directory: path.resolve("public") }
            ],
            proxy: {
                '/api': {
                    target: 'http://122.160.136.221:8000',
                    changeOrigin: true,
                }
            }
        },
        mode,
        entry: './src/index.tsx',
        devtool: (mode === 'development') ? 'inline-source-map' : false,
        performance: (mode === 'development') ? {} : {
            hints: false,
            maxEntrypointSize: 512000,
            maxAssetSize: 512000
        },
        module: {
            rules: [
                {
                    test: /\.(ico|json)$/,
                    exclude: /node_modules/,
                    use: ["file-loader?name=[name].[ext]"] // ?name=[name].[ext] is only necessary to preserve the original file name
                },
                {
                    test: /\.svg$/,
                    use: [
                        {
                            loader: 'svg-url-loader',
                            options: {
                                limit: 10000,
                            },
                        },
                    ],
                },
                {
                    test: /\.(eot|svg|ttf|woff|woff2?)$/,
                    use: {
                        loader: 'file-loader'
                        , options: {
                            name: '../css/fonts/[name]-[hash:8].[ext]'
                        }
                    }
                },
                {
                    test: /\.(jpe?g|pngnpm)$/,
                    exclude: /node_modules/,
                    use: ["url-loader", "file-loader"]
                },
                {
                    test: /\.css$/i,
                    use: ["style-loader", "css-loader"],
                },
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js', '*.jsx'],
        },
        output: {
            publicPath: "/",
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'build'),
        },
        plugins: [
            new WebpackPwaManifest({
                name: 'PWA',
                short_name: 'MyPWA',
                description: 'PWA By R. K. Sharma',
                background_color: '#ffffff',
                crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
                icons: [
                    {
                        src: path.resolve('src/assets/logo192.png'),
                        sizes: [64,96, 128, 192, 256, 384, 512] // multiple sizes
                    },
                    {
                        src: path.resolve('src/assets/logo512.png'),
                        size: '512x512' // you can also use the specifications pattern
                    }
                ]
            }),
            
            new HtmlWebpackPlugin({
                template: './public/index.html',
                filename: './index.html',
                inject: true,
                favicon: './public/favicon.ico',
               /// manifest:'./public/manifest.json'

            }),
            new webpack.DefinePlugin({
                "process.env": JSON.stringify(process.env),
            }),

        ]
    }
};