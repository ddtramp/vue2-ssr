const path = require('path')
// 用来处理后缀为.vue的文件
const { VueLoaderPlugin } = require('vue-loader')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
// 定位到项目的根目录
const resolve = (dir) => path.join(path.resolve(__dirname, "../"), dir)

// 打包时会先清除一下
// const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const isProd = process.env.NODE_ENV === "production"

module.exports = {
    mode: isProd ? 'production' : 'development',
    output: {
        path: resolve('dist'),
        publicPath: '/dist/',
        filename: '[name].[chunk-hash].js'
    },
    resolve: {
        alias: {
            'public': resolve('public')
        }
    },
    module: {
        noParse: /es6-promise\.js$/,
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    compilerOptions: {
                        preserveWhiteSpace: false
                    }
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: '[name].[ext]?[hash]'
                }
            },
            {
                test: /\.s(a|c)ss?$/,
                use: ['vue-style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    performance: {
        hints: false
    },
    plugins:[
        new VueLoaderPlugin(),
        // 编译后的友好提示，比如编译完成或者编译有错误
        new FriendlyErrorsWebpackPlugin(),
        // 打包时会先清楚一下
        // new CleanWebpackPlugin()
    ]
}

