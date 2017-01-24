const {
  join,
  resolve
} = require('path')

const constants = require('./webpack.constants')

const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const postcssEasings = require('postcss-easings');


const DefineENV = new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
})

const CSS_LOADERS = {
  css: '',
  scss: '!sass-loader'
};

const PORT = 8080
const ASSETS_DIR = "https://storage.googleapis.com/samrad-adddog/www-assets/assets/"

const ENV_VARS = {
}


module.exports = env => {
  const isDev = !!env.dev
  const isProd = !!env.prod
  const isTest = !!env.test
  console.log("--------------");
  console.log(isDev, isProd, isTest);
  console.log("--------------");
  const addPlugin = (add, plugin) => add ? plugin : undefined
  const ifDev = plugin => addPlugin(env.dev, plugin)
  const ifProd = plugin => addPlugin(env.prod, plugin)
  const ifNotTest = plugin => addPlugin(!env.test, plugin)
  const removeEmpty = array => array.filter(i => !!i)

  const stylesLoaders = () => {
    let _l = Object.keys(CSS_LOADERS).map(ext => {
      const prefix = 'css-loader?-minimize!postcss-loader';
      const extLoaders = prefix + CSS_LOADERS[ext];
      const loader = isDev ? `style-loader!${extLoaders}` : ExtractTextPlugin.extract('style-loader', extLoaders);
      return {
        loader,
        test: new RegExp(`\\.(${ext})$`),
      };
    });
    return _l
  }

  return {
    entry: {
      app: './index.js',
      vendor: ['lodash']
    },
    output: {
      filename: 'bundle.[name].[chunkhash].js',
      path: constants.DIST,
      publicPath:"/",
      pathinfo: !env.prod,
    },
    context: constants.SRC_DIR,
    devtool: env.prod ? 'source-map' : 'eval',
    devServer: {
      host: '0.0.0.0',
      inline: true,
      hot: true,
      stats: {
        colors: true
      },
      contentBase: constants.SRC_DIR,
      historyApiFallback: !!env.dev,
      port: PORT
    },
    bail: env.prod,
    resolve: {
      extensions: ['', '.js', '.jsx']
    },
    module: {
      loaders: [{
          test: /\.(js|jsx)$/,
          loader: 'babel',
          exclude: /node_modules(?!\/dis-gui)/
        }
      ].concat(stylesLoaders()),
    },
    sassLoader: {
      assetsUrl: `"${ASSETS_DIR}"`,
      includePaths: [
        join(constants.SRC_DIR, '/base'),
        join(constants.SRC_DIR, '/base/vars')
      ],
    },
    plugins: removeEmpty([
      new webpack.DefinePlugin({
        'process.env': ENV_VARS
      }),
      ifDev(new HtmlWebpackPlugin({
        template: './index.html'
      })),
      ifProd(new HtmlWebpackPlugin({
        assetsUrl: `"${ASSETS_DIR}`,
        template: './index.ejs', // Load a custom template (ejs by default see the FAQ for details)
      })),
      ifProd(new ExtractTextPlugin('[name]-[hash].css', {
        allChunks: true
      })),
      ifProd(new webpack.optimize.DedupePlugin()),
      ifProd(new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
        quiet: true,
      })),
      // saves 65 kB with Uglify!! Saves 38 kB without
      DefineENV,
      // saves 711 kB!!
      ifProd(new webpack.optimize.UglifyJsPlugin({
        compress: {
          screw_ie8: true, // eslint-disable-line
          warnings: false,
        },
      })),
      ifNotTest(new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor'
      })),
      ifNotTest(new webpack.optimize.CommonsChunkPlugin({
        name: 'common',
        fileName: 'bundle.common.js'
      }))
    ]),
    postcss: () => [
      autoprefixer({
        browsers: [
          'last 2 versions',
          'iOS >= 8',
          'Safari >= 8',
        ]
      }),
      postcssEasings
    ],
  }
}
