const express = require ("express")
const app = express()
const PORT = 3000
const db = require('./connection/connection')
const userRouters = require('./routers/userRouters')
const todoRouters = require('./routers/todoRouters')
app.use(express.json())

app.use('/users/', userRouters )
app.use('/todo/', todoRouters )

app.get('/', (req, res) => {
    res.send('Welcome to the TODO App');
  });


app.listen(PORT,()=>{
    console.log(`App listening on port ${PORT}`)
})