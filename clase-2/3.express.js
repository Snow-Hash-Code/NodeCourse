const express = require('express')
const ditto = require('./pokemon/ditto.json')

const PORT = process.env.PORT ?? 1234

const app = express()

app.disable('x-powered-by')

app.use(express.json({ 'Content-Type': 'application/json' }))

// middleware express.json() es lo mismo que el middleware creado abajo

// app.use((req, res, next) => {
//   if (req.method !== 'POST') return next()
//   if (req.headers['content-type'] !== 'application/json') return next()

//   // solo llegan request que son POST y que tienen el header Content-Type: application/json

//   let body = ''

//   req.on('data', chunk => {
//     body += chunk.toString()
//   })

//   req.on('end', () => {
//     const data = JSON.parse(body)
//     data.timestamp = Date.now()
//     // mutar la request y meter la información en el req.body
//     req.body = data
//     next()
//   })
// })

app.get('/', (req, res) => {
  res.send('<h1>Mi Página</h1>')
  // res.json({ message: 'hola mundo' })
})

app.get('/pokemon/ditto', (req, res) => {
  res.json(ditto)
})

app.post('/pokemon', (req, res) => {
  // con el req.body deberíamos guardar en DB
  res.status(201).json(req.body)
})

// la ultima a la que llega .use() para todas las acciones -> GET, POST, PUT, DELETE, PATCH
app.use((req, res) => {
  res.send('<h1>404 Not Found!</h1>')
})

app.listen(PORT, () => console.log(`server listening on port: http://localhost:${PORT}`))
