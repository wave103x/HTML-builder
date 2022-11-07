const fs = require('fs/promises');
const path = require('path');
fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true });

css();
assets();
html();

async function css() {
  try {
    fs.writeFile(path.join(__dirname, 'project-dist', 'style.css'), '');
    const files = await fs.readdir(path.join(__dirname, 'styles'), { withFileTypes: true });
    for (const file of files) {
      if (file.isFile() && path.extname(file.name) === '.css') {
        const data = await fs.readFile(path.join(__dirname, 'styles', file.name), { encoding: 'utf-8' });
        fs.appendFile(path.join(__dirname, 'project-dist', 'style.css'), data);
      }
    }
  } catch (err) {
    console.log(err);
  }
}

async function assets() {
  try {
    fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), { recursive: true });
    const files = await fs.readdir(path.join(__dirname, 'assets'), { withFileTypes: true });
    for (const file of files) {
      if (file.isDirectory()) {
        fs.mkdir(path.join(__dirname, 'project-dist', 'assets', file.name), { recursive: true });
        copyFolder(path.join(__dirname, 'assets', file.name), path.join(__dirname, 'project-dist', 'assets', file.name))
      }
    }
  } catch (err) {
    console.log(err);
  }
}


async function copyFolder(sourceFolder, distFolder) {
  try {
    const files = await fs.readdir(sourceFolder, { withFileTypes: true });
    for (const file of files) {
      if (file.isFile()) {
        fs.copyFile(path.join(sourceFolder, file.name), path.join(distFolder, file.name))
      }
    }

  } catch (err) {
    console.log(err);
  }
}


async function html() {
  try {
    let html = await fs.readFile(path.join(__dirname, 'template.html'), { encoding: 'utf-8' });

    const components = await fs.readdir(path.join(__dirname, 'components'), { withFileTypes: true });
    for (const component of components) {
      if (component.isFile() && path.extname(component.name) === '.html') {
        const compData = await fs.readFile(path.join(__dirname, 'components', component.name), { encoding: 'utf-8' });
        const bareCompName = path.basename((component.name), path.extname(component.name));
        html = html.replace(`{{${bareCompName}}}`, compData)
      }
    }

    fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), html);
  } catch (err) {
    console.log(err);
  }
}