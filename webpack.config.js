const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
module.exports = {
  devtools: 'source-map',
  entry: [
    './client.js'
  ],
  output: {
    path: __dirname + '/public',
    filename: '/bundle.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.UglifyJsPlugin({
     minimize: true,
     compress: {
       warnings: false
     }
   }),
   new webpack.DefinePlugin({
     'process.env': {
       'NODE_ENV': JSON.stringify('production')
     }
   })
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
