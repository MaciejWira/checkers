const path = require('path');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        new HTMLWebpackPlugin({
            title: 'Chess game'
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
    }
}