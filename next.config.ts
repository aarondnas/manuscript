module.exports = {
  webpack(config, options) {
    // SVG mit @svgr/webpack laden
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};