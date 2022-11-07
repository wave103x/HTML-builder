const fs = require('fs/promises');
const path = require('path');

fs.writeFile(path.join(__dirname, 'project-dist', 'bundle.css'), '');

async function mergeStyles() {
  try {
    const files = await fs.readdir(path.join(__dirname, 'styles'), { withFileTypes: true });

    for (const file of files) {
      if (file.isFile() && path.extname(file.name) === '.css') {
        const data = await fs.readFile(path.join(__dirname, 'styles', file.name), { encoding: 'utf-8' })
        fs.appendFile(
          path.join(__dirname, 'project-dist', 'bundle.css'),
          data
        )
      }
    }
  } catch (err) {
    console.log(err);
  }
}
mergeStyles();