const path = require('path')

module.exports = {
  entry: './src/app.js',
  output: {
    filename: './dist/[name].bundle.js' // Dynamically ouput the compile src/app.js to dist/app.bundle.js
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          path.resolve('./src')
        ]
      },
      {
        test: /\.scss$/,
        loaders: [ 'style-loader', 'css-loader', 'sass-loader' ]
      }
    ]
  }
}
