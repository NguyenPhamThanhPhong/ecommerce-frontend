const path = require('path');

// next.config.js

module.exports = {
  webpack: (config, { isServer }) => {
    config.resolve.alias = config.resolve.alias || {};

    config.resolve.alias['@shared'] = path.resolve(__dirname, '../shared/src');

    // Important: To allow outside folder imports, we need to modify the `include` rule for JS/JSX files
    config.module.rules.push({
      test: /\.(js|jsx)$/,
      include: [
        path.resolve(__dirname, './components'),
        path.resolve(__dirname, '../shared/src') // Allow importing from shared folder
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
