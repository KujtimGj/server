require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const userRoutes=require('./routes/userRoute')
const cors = require('cors');



// express app
const app = express()

app.use(cors({
    origin: 'http://localhost:3000',
    methods:["GET","POST","PUT","DELETE"]
}));

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

//routes
app.use('/api/user',userRoutes)

// connect to db
mongoose.connect(process.env.URI)
  .then(() => {
    console.log('connected to database')
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log('listening for requests on port', process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  }) 