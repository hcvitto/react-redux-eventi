var webpack = require('webpack');

module.exports = {
  plugins:[
    /*new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress:{
        warnings: true
      }
    })*/
  ],

  // single entry point
  entry: './src/app.js',
  output: {
    //path: __dirname,
    path: __dirname + '/dist',
    filename: 'app.js'
  },

  // multi entry point
  /*entry: {                  
    home: './src/home.js', 
    insert: './src/insert.js', 
  },
  output: {
    //path: __dirname,
    path: __dirname + '/dist',
    filename: "[name].js",
    chunkFilename: "[id].js"
  },*/
  
  watch: true,
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      },
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
