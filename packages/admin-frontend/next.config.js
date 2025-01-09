const path = require('path');

// next.config.js

module.exports = {
  reactStrictMode: false,
  webpack: (config, { isServer }) => {
    config.resolve.alias = config.resolve.alias || {};

    config.resolve.alias['@shared'] = path.resolve(__dirname, '../shared/src');
    config.resolve.alias['@components'] = path.resolve(__dirname, './components');
    config.resolve.alias['@styles'] = path.resolve(__dirname, './styles');
    // Important: To allow outside folder imports, we need to modify the `include` rule for JS/JSX files
    config.module.rules.push({
      test: /\.(js|jsx)$/,
      include: [
        path.resolve(__dirname, './pages'),
        path.resolve(__dirname, './styles'),
        path.resolve(__dirname, './components'),
        path.resolve(__dirname, '../shared/src') 
      ],
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['next/babel'], // Use Next.js's Babel presets
        },
      },
    });

    return config;
  },
};
