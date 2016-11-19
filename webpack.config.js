const webpack = require('webpack')

module.exports = {
  entry: "./client.js",
  output: {
    filename: "/bundle.js",
    path: __dirname + '/public'
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|server.js)/,
        loader: 'babel'
      }
    ]
  }
}
