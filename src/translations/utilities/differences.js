const fs = require('fs');

let rawdata = fs.readFileSync('./src/translations/esOLD.json');
const esOLD = JSON.parse(rawdata);
rawdata = fs.readFileSync('./src/translations/es.json');
const esNEW = JSON.parse(rawdata);

const keysNOTfound = []
const differentTexts = {}
for (let key in esOLD) {
  if (esNEW.hasOwnProperty(key)) {
    if (esOLD[key] !== esNEW[key]) {
      differentTexts[key] = [esOLD[key], esNEW[key]]
    }
  } else {
    keysNOTfound.push(key)
  }
}

let data = JSON.stringify(keysNOTfound);
fs.writeFileSync('keysNOTfound.json', data);
data = JSON.stringify(differentTexts);
fs.writeFileSync('differentTexts.json', data);
