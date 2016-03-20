'use strict';
var fs = require('fs');

var index = fs.readFileSync("build/index.html", { encoding: 'utf8' });
index = index
    .replace(/<script src="js\/build.js" defer=""><\/script>/, '')
    .replace(/<\/body>/, "<script src=\"js/build.js\"></script><\/body>")
    .replace(/<link rel="stylesheet" href="https:\/\/fonts.googleapis.com\/css\?family=Roboto:400,300,300italic,400italic,500,500italic,700,700italic">/, '')
    .replace(/<link rel="stylesheet" href="https:\/\/fonts.googleapis.com\/css\?family=Roboto\+Mono:400,700">/, '');
fs.writeFile("build/index.html", index);