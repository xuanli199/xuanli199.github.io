import path from 'path'
import nodeExternals from 'webpack-node-externals'

const config = {
  target: 'node',
  entry: {
    'index': './src/index.js'
  },
  externals: [nodeExternals()],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              'env'
            ]
          }
        }
      }
    ]
  },
  devtool: 'source-map'
}

export default config
