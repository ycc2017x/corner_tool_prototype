var path = require('path');
var webpack = require('webpack');
var fs = require('fs');

// full path
function fp(resolvePath) {
    return path.resolve(process.cwd(), resolvePath);
}

module.exports = function (env) {
    console.log(env);

    var isProd = env && env.prod;
    var isStage = env && env.stage;
    var isLocal = env && env.local;
    var isDev = isProd || isStage ? false : true;

    function genConfig() {
        var config = {
            entry: {
                app: [fp('./src/root.js')]
            },
            output: {
                filename: '[name].entry.js',
                path: path.join(__dirname, "docs", "dist", "js"),
                publicPath: "dist/js/"
            },
            devtool: !isLocal && (isProd || isStage) && !isDev ? false : 'source-map', //turn off on prod
            resolve: {
                symlinks: false,
                cacheWithContext: false,
                modules: [fp('node_modules')],
                extensions: ['.web.js', '.web.jsx', '.js', '.jsx', '.json'],
                alias: {
                }
            },
            mode: !isLocal && (isProd || isStage) && !isDev ? 'production' : 'development',
            module: {
                unknownContextRegExp: /$^/,
                unknownContextCritical: false,
                noParse: [/\.(sql|zip|md)$/],
                rules: [
                    {
                        test: /\.jsx?$/,
                        exclude: /node_modules/,
                        use: [
                            {
                                loader: 'babel-loader',
                                options: {
                                    presets: ["es2015", "stage-1"]
                                }
                            }
                        ]
                    },
                    {
                        test: /node_modules.*(-native-gestures|-vector-icons|-sortable-listview|-gifted-chat|-native-video|-native-camera|-native-fbsdk|-material-kit|-clone-referenced-element|-native-action-sheet|-native-parsed-text|-native-invertible-scroll-view|-native-scrollable-mixin|-native-communications|-native-lightbox|-native-pulse|rn-live|-native-vlc-player|flv.js).*\.jsx?$/,
                        use: [
                            {
                                loader: 'babel-loader',
                                options: {
                                    presets: ["es2015", "stage-1"]
                                }
                            }
                        ]
                    },
                    {
                        test: /\.css$/,
                        use: [
                            { loader: "style-loader" },
                            { loader: "css-loader" }
                        ]
                    },
                    {
                        test: /\.scss$/,
                        use: [
                            { loader: "style-loader" },
                            { loader: "css-loader", options: { sourceMap: true } },
                            { loader: "resolve-url-loader" },
                            { loader: "sass-loader", options: { sourceMap: true } }
                        ]
                    },
                    {
                        test: /\.(png|jpg|gif|svg)$/,
                        use: [
                            {
                                loader: 'file-loader',
                                options: {
                                    name: "[path][name].[ext]"
                                }
                            }
                        ]
                    },
                    //font awesome stuff
                    { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader" },
                    { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader" },
                    { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader" },
                    { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader" },
                    { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader" },
                ]
            },
            optimization: {
                splitChunks: {
                    cacheGroups: {
                        vendor: {
                            test: /node_modules/,
                            name: "vendor",
                            chunks: "initial",
                            enforce: true
                        }
                    }
                }
            },
            plugins: [
                new webpack.IgnorePlugin(/\.\/locale$/),
                // new webpack.NoEmitOnErrorsPlugin(),
                new webpack.ProvidePlugin({
                    // shim to simulate globalness
                    'Promise': 'es6-promise',
                    'fetch': 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch'
                })
            ]
        }

        if (isDev || isLocal) { //is hot module replacement
            config.devServer = {
                https: false,
                port: 8080
            }
        } else { //is build
            config.plugins.push(
                !isLocal ? new webpack.DefinePlugin({
            		'process.env': {
            			NODE_ENV: JSON.stringify('production')
            		}
            	}) : new function() {}
            )

            // do our cache busting
            var replaceReg = /\?v=\d.\d+/gi;
            var helloLoc = fp('docs/index.html');

            var ds = Date.now().toString();

            var helloFile = fs.readFileSync(helloLoc, 'utf8').toString();
            helloFile = helloFile.replace(replaceReg, "?v=" + ds);

            fs.writeFile(helloLoc, helloFile);
        }

        return config;
    }

    return genConfig();
}