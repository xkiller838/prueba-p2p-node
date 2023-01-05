const crypto = require('crypto');

// Función para calcular el hash de una pareja de elementos
function calculateHash(left, right) {
  const hash = crypto.createHash('sha256');
  hash.update(left);
  hash.update(right);
  return hash.digest('hex');
}

// Función para construir el árbol de Merkle a partir de una lista de elementos
function buildMerkleTree(elements) {
  // Si la lista tiene un solo elemento, devolvemos ese elemento
  if (elements.length === 1) {
    return elements[0];
  }

  // Si la lista tiene un número impar de elementos, duplicamos el último
  // para que la lista tenga un número par de elementos
  if (elements.length % 2 === 1) {
    elements.push(elements[elements.length - 1]);
  }

  // Dividimos la lista en parejas y calculamos el hash de cada pareja
  const hashes = [];
  for (let i = 0; i < elements.length; i += 2) {
    const left = elements[i];
    const right = elements[i + 1];
    const hash = calculateHash(left, right);
    hashes.push(hash);
  }

  // Llamamos recursivamente a la función para construir el árbol con la lista de hashes
  return buildMerkleTree(hashes);
}

// Ejemplo de uso de la función
const elements = ['a', 'b', 'c', 'd', 'e'];
const root = buildMerkleTree(elements);
console.log(root); // Imprime el hash de la raíz del árbol