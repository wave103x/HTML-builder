const path = require('path');
const fs = require('fs/promises');

async function copyDir() {
  try {
    await fs.rm(path.join(__dirname, 'files-copy'), {recursive: true, force: true});
    fs.mkdir(path.join(__dirname, 'files-copy'), {recursive: true});
    const files = await fs.readdir(path.join(__dirname, 'files'));
    for (const file of files) {
      fs.copyFile(path.join(__dirname, 'files', file), path.join(__dirname, 'files-copy', file))
    }
  } catch (err) {
    console.log(err);
  }
}
copyDir();