const express = require('express')
const app = express()
const dotenv = require('dotenv')
const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')
const connectDB = require('./db/db')

dotenv.config()

connectDB()

app.use(express.json())
app.use('/api/v1/products', productRoutes)
app.use('/api/v1/users', userRoutes)

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Listening on port ${port}`))
