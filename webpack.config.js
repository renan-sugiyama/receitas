const path = require('path')

module.exports ={ 
    "mode": "development",
    entry: {
        index: ['babel-polyfill', './src/index.js'],
        edit: ['babel-polyfill', './src/edit.js']
    },
    "output": {
        path: path.resolve(__dirname, 'public/scripts'),
        "filename": "[name].bundler.js"
    },
    "devtool": "source-map",
    "devServer": {
        contentBase: path.resolve(__dirname, 'public'),
        publicPath: '/scripts/'
    },
    "module": {
        "rules": [
            {
                "test": /\.js$/,
                "exclude": /node_modules/,
                "use": {
                    "loader": "babel-loader",
                    "options": {
                        "presets": [
                            "@babel/preset-env"
                        ]
                    }
                }
            }
        ]
    },
    
}
