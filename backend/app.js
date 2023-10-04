const express = require('express')
const bodyParser = require('body-parser')
const productRoutes = require('./routes/product-routes')

const app = express()
app.use(bodyParser.json({ limit: '10mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*')
//   res.setHeader('Access-Control-Allow-Headers', '*')
//   res.setHeader('Access-Control-Allow-Methods', '*')
//   next()
// })

app.use(express.json())
app.use('/api', productRoutes)


app.listen(8000)
