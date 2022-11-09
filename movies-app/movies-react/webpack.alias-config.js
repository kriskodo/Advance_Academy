const path = require('path');

module.exports = {
  resolve: {
    alias: {
      '@Src': path.join(__dirname, 'src'),
      '@Modules': path.join(__dirname, 'src/modules'),
      '@Api': path.join(__dirname, 'src/api'),
    },
  },
}
