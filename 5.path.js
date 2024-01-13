const path = require('node:path')

// barra separadora  de carpetas segun OS
console.log(path.sep)

// unir rutas cno path.join()
const filePath = path.join('content', 'subfolder', 'test.txt')
console.log(filePath)

// nombre del fichero al que apunta la ruta
const base = path.basename('\\tmp\\midu-secret-files\\password.txt')
console.log(base)

// nombre del fichero al que apunta la ruta sin la extension
const fileName = path.basename('\\tmp\\midu-secret-files\\password.txt', '.txt')
console.log(fileName)

// extension de un fichero
const extension = path.extname('image.jpg')
console.log(extension)