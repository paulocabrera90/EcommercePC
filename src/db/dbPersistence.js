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

module.exports = { 
  saveProductsJSON
}