const path = require('path');
const fs = require('fs');
const { stdin, stdout } = process;

const output = fs.createWriteStream(path.join(__dirname, 'dist.txt'));

process.on('exit', () => {
    output.end();
    stdout.write('thank you');
});

process.on('SIGINT', () => {
    process.exit();
});

stdout.write('type command\n');
stdin.on('data', data => {
    const dataStr = data.toString();
    if (dataStr.includes('exit')) process.exit();
    output.write(dataStr);
})