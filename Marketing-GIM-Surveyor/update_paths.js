const fs = require('fs');

// 1. Update index.html
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(/\.\/Marketing%20Calendar\//g, './Marketing-Calendar/');
html = html.replace(/\.\/Marketing Calendar\//g, './Marketing-Calendar/');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Updated index.html paths to Marketing-Calendar');

// 2. Update server.js
let serverJs = fs.readFileSync('server.js', 'utf8');
serverJs = serverJs.replace(/Marketing%20Calendar/g, 'Marketing-Calendar');
serverJs = serverJs.replace(/Marketing Calendar/g, 'Marketing-Calendar');
fs.writeFileSync('server.js', serverJs, 'utf8');
console.log('Updated server.js');
