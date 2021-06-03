module.exports = [
  {
    test: /\.jsx?$/,
    exclude: /(node_modules|bower_components|public\/)/,
    loader: "babel-loader"
  },
  {
    test: /\.css$/,
    loaders: ['style-loader', 'css-loader?importLoaders=1'],
    exclude: ['node_modules']
  },
  {
    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
    loader: "file-loader"
  },
  {
    test: /\.(woff|woff2)$/,
    loader: "url-loader?prefix=font/&limit=5000"
  },
  {
    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
    loader: "url-loader?limit=10000&mimetype=application/octet-stream"
  },
  {
    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
    loader: "url-loader?limit=10000&mimetype=image/svg+xml"
  },
  {
    test: /\.(jpg|png|ico|gif)$/,
    exclude: /(node_modules|bower_components)/,
    loader: "file-loader?name=[name].[ext]"
  },
  {
    test: /\.pdf$/,
    loader: "file-loader"
  },
  {
    test: /(callback.html|manifest.json)/,
    loader: "file-loader?name=[name].[ext]"
  }
];
