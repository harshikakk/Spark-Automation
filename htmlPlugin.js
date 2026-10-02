const
  path              = require('path'),
  manifest          = require('../manifest'),
  HtmlWebpackPlugin = require('html-webpack-plugin');

const titles = {
  'index': 'SPARK · Industrial IoT Control Center',
  'devices': 'SPARK · Devices',
  'control': 'SPARK · LED Control',
  'history': 'SPARK · LED History',
  'analytics': 'SPARK · Analytics',
  'status': 'SPARK · System Status',
  'company': 'SPARK · Company Information',
  'profile': 'SPARK · Profile',
  'settings': 'SPARK · Settings',
  'signin': 'SPARK · Sign In',
};

let minify = {
  collapseWhitespace: false,
  minifyCSS: false,
  minifyJS: false,
  removeComments: true,
  useShortDoctype: false,
};

if (manifest.MINIFY) {
  minify = {
    collapseWhitespace: true,
    minifyCSS: true,
    minifyJS: true,
    removeComments: true,
    useShortDoctype: true,
  };
}


// Every page is now a 2026 page. They all get the 2026 bundle and nothing else.
module.exports = Object.keys(titles).map(title => {
  return new HtmlWebpackPlugin({
    template: path.join(manifest.paths.src, `${title}.html`),
    path: manifest.paths.build,
    filename: `${title}.html`,
    chunks: ['runtime', '2026'],
    inject: true,
    minify,
  });
});
