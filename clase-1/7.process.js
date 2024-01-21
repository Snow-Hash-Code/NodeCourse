// argumentos
// console.log(process.argv)

// controlar el proceso y su salida
// process.exit(1)

// controlar eventos del proceso
process.on('exit', () => {
  // limpiar recursos
})

// current workin directory
console.log(process.cwd())

// plataforma
console.log(process.platform)

// variables de entorno env
console.log(process.env)