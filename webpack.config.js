var webpack = require('webpack');
var LessPluginCleanCSS = require('less-plugin-clean-css');
var path = require('path');

module.exports = {
  entry: {
    client: "./src/client.js"
  },
  output: {
    path: "./build",
    filename: "[name].js"
  },
  plugins: [
    // use the `main` key of modules' bower.json to determine the files to load
    new webpack.ResolverPlugin(
          new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
      ),
    new webpack.ProvidePlugin({
      ko: 'knockout',
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      moment: 'moment',
      fetch: 'imports?this=>global!exports?global.fetch!fetch'
    }),
  ],
  module: {
    loaders: [{test: path.join(__dirname, 'src'), loader: 'babel-loader' }]
  },
  // allow modules listed in the bower_components folder to be loaded
  resolve: {
    root: [ './bower_components' ]
  }
};
