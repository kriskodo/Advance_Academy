const { alias } = require('react-app-rewire-alias');

module.exports = function override(config) {
  alias({
    '@Src': 'src',
    '@Components': 'src/components',
    '@Api': 'src/api',
  })(config);

  return config;
};
