const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.tsx', // Your app's entry point
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true, // Cleans the dist folder before every build
  },
  mode: 'development',
  devServer: {
    port: 3000,
    open: true, // Automatically opens the browser
    hot: true,  // Enables Hot Module Replacement
    historyApiFallback: true, // Helpful if using React Router
    proxy: [
      {
        context: ['/api'], // Forward API calls to the Spring Boot backend
        target: 'http://localhost:8080',
      },
    ],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/, // Matches .js and .jsx files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/, // Matches plain .css files
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'], // Allows importing without writing extensions
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // Point to your template HTML file
    }),
  ],
};
