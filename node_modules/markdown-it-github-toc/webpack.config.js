const nodeExternals = require('webpack-node-externals')

const rules = [{
  test: /\.js$/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: [
        ['env', {
          targets: {
            node: 'current'
          }
        }]
      ],
      plugins: [
        ['transform-object-rest-spread']
      ]
    }
  }
}]

const config = {
  target: 'node',
  externals: [nodeExternals()],
  entry: {
    'src/index': './src/index.js',
    'test/anchor': './test/anchor.js',
    'test/indentation': './test/indentation.js',
    'test/toc': './test/toc.js'
  },
  output: {
    path: '.',
    filename: '[name].bundle.js',
    libraryTarget: 'commonjs2'
  },
  module: { rules }
}

module.exports = [config]
