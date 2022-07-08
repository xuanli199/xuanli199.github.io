const nodeExternals = require('webpack-node-externals')

const config = {
  target: 'node',
  externals: [nodeExternals()],
  entry: {
    'src/index': './src/index.js',
    'test/index': './test/index.js'
  },
  output: {
    path: '.',
    filename: '[name].bundle.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            ['env', {
              'targets': {
                'node': 'current'
              }
            }]
          ]
        }
      }
    }]
  }
}

export default [config]
