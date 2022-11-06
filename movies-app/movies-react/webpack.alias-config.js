const path = require('path');

module.exports = {
  resolve: {
    alias: {
      '@Src': path.join(__dirname, 'src'),
      '@Components': path.join(__dirname, 'src/components'),
      '@Api': path.join(__dirname, 'src/api'),
    },
  },
}
