const webpack = require('webpack');
const path = require('path');
const TransferWebpackPlugin = require('transfer-webpack-plugin');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractPlugin = new ExtractTextPlugin({
    filename: 'main.css'
});

const config = {
    // Entry points to the project
    entry: {
        main: [
            // only- means to only hot reload for successful updates
            'webpack/hot/only-dev-server',
            './src/app/app.js',
        ],
    },
    // Server Configuration options
    devServer: {
        contentBase: 'src/www', // Relative directory for base of server
        hot: true, // Live-reload
        inline: true,
        port: 3000, // Port Number
        host: 'localhost', // Change to '0.0.0.0' for external facing server
    },
    devtool: 'eval', // '#cheap-module-source-map',
    output: {
        path: path.resolve(__dirname, 'build'), // Path of output file
        filename: 'app.js',
    },
    plugins: [
        // Enables Hot Modules Replacement
        new webpack.HotModuleReplacementPlugin(),
        // Moves files
        new TransferWebpackPlugin([
            {from: 'www'},
        ], path.resolve(__dirname, 'src')),
        extractPlugin
    ],
    resolve: {
        extensions: ['.js', '.less', '.css']
        //modules: [path.resolve(__dirname, "vendor"), "node_modules"],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    cacheDirectory: true,
                },
            },
            {
                test: /\.scss$/,
                use: extractPlugin.extract({
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.less$/,
                use: extractPlugin.extract({
                    use: ['css-loader', 'less-loader']
                })
            },
            {
                test: /\.css/,
                use: extractPlugin.extract({
                    use: ['style-loader', 'css-loader']
                })
            },
             
            {
                test: /\.svg/,
                loader: "url-loader?limit=26000&mimetype=image/svg+xml"
            },
        ],
        loaders: [
            {
                test: /\.js$/,
                loader: "babel",
                exclude: [/node_modules/, /public/]
            },

            // {
            //     test: /\.css$/,
            //     loader: "style-loader!css-loader!less-loader!postcss-loader",
            //
            //     exclude: [/node_modules/, /public/]
            // },
            // {
            //     test: /\.less$/,
            //     loader: "style-loader!css-loader!less-loader!postcss-loader!less",
            //     exclude: [/node_modules/, /public/]
            // },
            // {
            //     test: /\.styl$/,
            //     loader: "style-loader!css-loader!postcss-loader!styl$",
            //     exclude: [/node_modules/, /public/]
            // },
            {
                test: /\.gif$/,
                loader: "url-loader?limit=10000&mimetype=image/gif"
            },
            {
                test: /\.jpg$/,
                loader: "url-loader?limit=10000&mimetype=image/jpg"
            },
            {
                test: /\.png$/,
                loader: "url-loader?limit=10000&mimetype=image/png"
            },
            {
                test: /\.svg/,
                loader: "url-loader?limit=26000&mimetype=image/svg+xml"
            },
            {
                test: /\.jsx$/,
                loader: "react-hot!babel",
                exclude: [/node_modules/, /public/]
            },
            {
                test: /\.json$/,
                loader: "json-loader"
            }
        ]
    },
};

module.exports = config;
