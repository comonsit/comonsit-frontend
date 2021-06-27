// Convert Language csv files into json files
// Execute from root folder with node "node src/translations/utilities/csv2json.js"

const fs = require('fs');
const csv = require('csv-parser');

const reading = (csvInput, jsonNAME) => {
  const newTranslation = {}
  fs.createReadStream(csvInput)
    .pipe(csv())
    .on('data', (row) => {
      // console.log(row.id);
      newTranslation[row.id] = row.value
    })
    .on('end', () => {
      // console.log('CSV file successfully processed');
      // console.log(newTranslation)
      let data = JSON.stringify(newTranslation);
      fs.writeFileSync(jsonNAME, data);
    });
}

// reading('./src/translations/es.csv', './src/translations/es.json')
// reading('./src/translations/tz.csv', './src/translations/tz.json')
reading('./src/translations/en.csv', './src/translations/en.json')
