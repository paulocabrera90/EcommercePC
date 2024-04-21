const fs = require('fs');

async function saveProductsJSON(jsonData, filePath) {

  const writeStream = fs.createWriteStream(filePath);
  writeStream.write(JSON.stringify(jsonData));

  writeStream.end(); 
  
  return new Promise((resolve, reject) => {
      console.log('Inicio de la función saveProductsJSON');
      writeStream.on('finish', () => {
          console.log('JSON guardado correctamente en', filePath);
          resolve();
      });
      writeStream.on('error', (err) => {
          console.error('Error al guardar el archivo:', err);
          reject(err);
      });
      console.log('FIN de la función saveProductsJSON');
  });
}

async function findProductsJSON(filePath, callback) {
  fs.access(filePath, fs.constants.F_OK, async (err) => {
    if (err) {
        console.error('El archivo JSON no existe.');
        callback(err);
    } else {
        await fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error al leer el archivo JSON:', err);
                callback(err);
            } else {
                const datos = JSON.parse(data);
                callback(null, datos);
            }
        });
    }
});
  
}

module.exports = { 
  saveProductsJSON,
  findProductsJSON
}