const fs = require('fs');

async function saveProductsJSON(jsonData, filePath) {

  await fs.writeFile(filePath, JSON.stringify(jsonData), (err) => {
    if (err)
      console.log(err);
      return
  })
  return jsonData;
}

async function readProductsJSON(filePath, callback) {
  
  fs.readFile(filePath, 'utf8', (error, data) => {
    if (error) {
        console.error('Error al leer el archivo, some error');
        callback(err,null);
        return;
    }
    try {
      const jsonData = JSON.parse(data);
      callback(null, jsonData);
    } catch (parseError) {
      callback(parseError, null);
    }
  });
}

async function existProductsJSON(filePath) {

    await fs.access(filePath, fs.constants.R_OK, (err) => {
      console.log('\n> Checking Permission for reading the file');

      if (err){
        console.error('No Read access, some error', err);
        return false;
      }
      console.log('Ningun error existsProducts');
      return true;
    });
    console.log('existsProducts');
    return true;
}

module.exports = { 
  saveProductsJSON,
  existProductsJSON,
  readProductsJSON
}