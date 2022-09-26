const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')
const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')
const orderRoutes = require('./routes/orderRoutes')
const connectDB = require('./db/db')
const path = require('path')
dotenv.config()

connectDB()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/v1/products', productRoutes)
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/order', orderRoutes)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Listening on port ${port}`))
