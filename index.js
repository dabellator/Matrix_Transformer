#! /usr/bin/env node

var fs = require('fs');

var modifiedCSV = fs.readFileSync(process.argv[2], 'utf-8')
    .split(/\r?\n/)
    .map(function(line) {
      return line.split(',');
    }).map(function(line) {
      var coordinates = {};

      if (!isNaN(parseFloat(line[4]))) coordinates.x = parseFloat(line[4]);
      if (!isNaN(parseFloat(line[5]))) coordinates.y = parseFloat(line[5]);
      if (!isNaN(parseFloat(line[6]))) coordinates.z = parseFloat(line[6]);
      
      // add Matrix Transforms here

      Object.keys(coordinates).forEach(function (key) {
        if (key === 'x') line[4] = coordinates[key].toString();
        if (key === 'y') line[5] = coordinates[key].toString();
        if (key === 'z') line[6] = coordinates[key].toString();
      })

      return line.join(',');
    }).join(/\r?\n/);

fs.writeFile(process.argv[3], modifiedCSV);

// console.log(modifiedCSV);
