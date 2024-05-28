const path = require('path');

module.exports = {
  mode: 'development', // or 'production' as per your environment
  entry: './src/index.js', // adjust entry point as per your project structure
  output: {
    path: path.resolve(__dirname, 'dist'), // adjust output path as per your project structure
    filename: 'bundle.js', // adjust output filename as per your project requirements
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      // Add the following rule to ignore warnings from source-map-loader
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
        exclude: [
          // Add any exclusions here if necessary
          /node_modules\/(?!(html2pdf\.js)\/).*/,
        ],
      },
    ],
  },
  devServer: {
    // Your devServer configuration
    // For example:
    port: 3000,
    contentBase: path.join(__dirname, 'dist'),
    hot: true,
    open: true,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  // Add the following option to ignore warnings
  stats: {
    warningsFilter: /source-map-loader/,
  },
};
