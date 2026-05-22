const fs = require('fs-extra');
const concat = require('concat');

(async function build() {
  const files = ['./dist/customController/browser/main.js'];
  await fs.ensureDir('widget');
  await concat(files, 'widget/allocation-widget-v5.2.js');
})();
