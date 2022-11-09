const { alias } = require('react-app-rewire-alias');

module.exports = function override(config) {
  alias({
    '@Src': 'src',
    '@Modules': 'src/modules',
    '@Api': 'src/api',
  })(config);

  return config;
};
