const fs = require('fs');

async function saveJSON(jsonData, filePath) {
  try {
      await fs.promises.writeFile(filePath, JSON.stringify(jsonData));
      console.log('Archivo guardado exitosamente');
      return jsonData;
  } catch (err) {
      console.error('Error al guardar el archivo:', err);
      throw err;
  }
}

async function readJSON(filePath) {
  try {
      const data = await fs.promises.readFile(filePath, 'utf8');
      return JSON.parse(data);
  } catch (error) {
      console.error('Error al leer el archivo:', error);
      throw error;
  }
}

async function existJSON(filePath) {

  console.log('\n> Chequeando si el archivo existe...');

  return new Promise((resolve, reject) => {
      fs.access(filePath, fs.constants.R_OK, (err) => {
          if (err) {
              console.error('Error: No existe el archivo u otro error', err);
              resolve(false);
          } else {
              console.log('Existe el archivo json');
              resolve(true);
          }
      });
  });
}

module.exports = { 
  saveJSON,
  existJSON,
  readJSON
}