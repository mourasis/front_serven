// fileUtils.js
const fs = require('fs');

// Função para ler o conteúdo de um arquivo
function readFile(filePath, callback) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  });
}

// Função para escrever dados em um arquivo
function writeFile(filePath, data, callback) {
  fs.writeFile(filePath, data, 'utf8', (err) => {
    if (err) {
      callback(err);
    } else {
      callback(null);
    }
  });
}

export default module.exports = {
  readFile,
  writeFile,
};
