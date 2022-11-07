const path = require('path');
const fsp = require('fs/promises');
const { stdin, stdout } = process;

async function func() {
  try {
    const files = await fsp.readdir(path.join(__dirname, 'secret-folder'), { withFileTypes: true });
    for (const file of files) {
      if (file.isFile()) {
        const fileName = path.basename(path.join(__dirname, file.name), path.extname(path.join(__dirname, file.name)));
        const ext = path.extname(path.join(__dirname, file.name)).slice(1);
        const stats = await fsp.stat(path.join(__dirname,'secret-folder', file.name))
        stdout.write(`${fileName} - ${ext} - ${(stats.size / 1024).toFixed(2)}kb\n`);
      }
    }
  } catch (err) {
    console.log(err)
  }
}

func();