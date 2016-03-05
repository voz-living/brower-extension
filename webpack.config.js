require('es6-promise').polyfill();
var path = require('path');
var fs = require("fs");
var webpack = require('webpack');

module.exports = {
    // devtool: 'inline-source-map',
    entry: {
        'content-script': './src/content/script.js',
        'background': './src/background/background.js'
    },
    output: {
        path: path.join(__dirname, "./build/"),
        filename: '[name].js'
    },
    module: {
        loaders: [{
                test: /\.less$/,
                loaders: ["style-loader", "css-loader", "less-loader"]
            }, {
                test: /\.html$/,
                loader: 'html'
            }, {
                test: /\.svg$/,
                loader: 'url-loader?mimetype=image/svg+xml'
            }, {
                test: /\.(es6|hyper)$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['es2015'],
                    plugins: ['transform-runtime'],
                    plugins: ['transform-async-to-generator']
                }
            }, {
                test: /\.json$/,
                loader: 'json-loader'
            },

            {
                test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
                loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
            }
        ]
    },
    resolve: {
        root: [
            path.resolve('./src'),
            path.resolve('./node_modules')
        ],
        /*.concat(fs.readdirSync("./node_modules")
				.filter(function(f){return fs.statSync(path.join("./node_modules", f)).isDirectory()})
				.map(function(f){return path.resolve(path.join("./node_modules", f, "node_modules"))})),*/
        alias: {},
        extensions: ['.es6', '', '.js', '.json', '.hyper']
    },
    resolveLoader: {
        root: [
            path.join(__dirname, "node_modules")
        ],
        alias: {}
    },
    plugins: [
        // new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(true),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
			_: "lodash",
			lodash: "lodash",
            Vue: "vue"
        })
        // new webpack.optimize.UglifyJsPlugin({
        // 	compress: {
        // 		warnings: false
        // 	}
        // })
    ]
};
