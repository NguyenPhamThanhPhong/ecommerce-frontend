const path = require('path');
const { override, addWebpackAlias } = require('customize-cra');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');

module.exports = override(
  addWebpackAlias({
    '@shared': path.resolve(__dirname, '../../shared/src'),
  }),
  (config) => {
    // Remove ModuleScopePlugin to allow for custom module resolution
    config.resolve.plugins = config.resolve.plugins.filter(
      (plugin) => !(plugin instanceof ModuleScopePlugin)
    );

    // Ensure the Babel loader is configured to handle .jsx files
    config.module.rules.push({
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react']
        }
      }
    });

    return config;
  }
);
