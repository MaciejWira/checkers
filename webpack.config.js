const path = require('path');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    entry: './src/main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        hotOnly: true,
    },
    plugins: [
        new HTMLWebpackPlugin({
            title: 'Checkers'
        }),
        new MiniCSSExtractPlugin()
    ],
    resolve: {
        alias: {
            Styles: path.resolve(__dirname, 'src/styles'),
            Utils: path.resolve(__dirname, 'src/utils'),
            Classes: path.resolve(__dirname, 'src/classes'),
            Components: path.resolve(__dirname, 'src/components')
        }
    },
    module: {
        rules: [
            {
                test: /.s?css$/i,
                oneOf: [
                    {
                        test: /global.s?css$/i,
                        use: [ 
                            MiniCSSExtractPlugin.loader, 
                            'css-loader',
                            {
                                loader: 'sass-loader',
                                options: {
                                    sassOptions: {
                                        includePaths: ['src/styles']
                                    }
                                }
                            }
                        ]
                    },
                    {
                        test: /.s?css$/i,
                        use: [ 
                            'style-loader', 
                            {
                                loader: 'css-loader',
                                options: {
                                    modules: {
                                        localIdentName: "[name]__[local]-[hash:base64:5]"
                                    }
                                }
                            },
                            {
                                loader: 'sass-loader',
                                options: {
                                    sassOptions: {
                                        includePaths: ['src/styles']
                                    }
                                }
                            }
                        ]
                    }
                ]

            },
            {
                test: /.js$/i,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [ '@babel/preset-env' ]
                    }
                }
            }
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
              extractComments: true,
              terserOptions: {
                // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
                 compress: {
                     drop_console: true,
                 },
          }
            }),
          ]
    },
}