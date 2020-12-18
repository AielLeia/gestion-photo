let path = require('path')

let config = {
    entry: './reactjs/main.tsx',
    output: {
        path: path.resolve(__dirname, 'dist', 'reactjs'),
        filename: 'main.js',
        publicPath: '/dist/'
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx']
    },
    module: {
        rules: [
            {
                test: /\.tsx?/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            configFile: 'tsconfig.react.json'
                        },
                    }
                ],
                exclude: [/node_modules/, /src/]
            },
            {
                test: /\.tsx?$/,
                enforce: 'pre',
                use: ['source-map-loader'],
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            }
        ]
    },
    watch: true
}

module.exports = config