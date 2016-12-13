const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
module.exports = {
  devtools: 'eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './client.js'
  ],
  output: {
    path: __dirname + '/public',
    filename: '/bundle.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|server.js)/,
        loaders: ['react-hot', 'babel']
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
      },
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
}
