const path = require('path');

// next.config.js

module.exports = {
  webpack: (config, { isServer }) => {
    config.resolve.alias = config.resolve.alias || {};

    config.resolve.alias['@src'] = path.resolve(__dirname, './src');
    config.resolve.alias['@utils'] = path.resolve(__dirname, './utils');
    

    console.log('From SHARED: config.resolve.alias:', config.resolve.alias);
    // Important: To allow outside folder imports, we need to modify the `include` rule for JS/JSX files
    config.module.rules.push({
      test: /\.(js|jsx)$/,
      include: [
        path.resolve(__dirname, './utils'),
        path.resolve(__dirname, '../src') 
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
