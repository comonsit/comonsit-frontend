const fs = require('fs');
const os = require("os");

const writing = (jsonInput, csvNAME) => {
  rawdata = fs.readFileSync(jsonInput);
  const data = JSON.parse(rawdata);

  const streamtz = fs.createWriteStream(csvNAME);
  streamtz.once('open', function(fd) {
    streamtz.write(`id,value`+ os.EOL);
    for (let key in data) {
      streamtz.write(key+`,"`+data[key]+`"`+ os.EOL);
    }
    streamtz.end();
  });
}

writing('./src/translations/es.json', "./src/translations/es.csv")
writing('./src/translations/tz.json', "./src/translations/tz.csv")
