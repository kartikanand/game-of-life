const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/scripts/index.js',
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                include: [
                    path.resolve(__dirname, "src/scripts"),
                ],
                test: /\.jsx?$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['env', 'react'],
                    }
                }
            },
        ]
    }
};
