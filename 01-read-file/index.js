const fs = require('fs');
const path = require('path');

const readableStream = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf-8');
readableStream.on('data', chunk => process.stdout.write(chunk));
readableStream.on('error', err => console.log('error', err.message));
