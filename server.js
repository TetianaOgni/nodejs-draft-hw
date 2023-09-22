const mongoose = require('mongoose')//подключение библиотеки для работы с MongoDB

const app = require('./app')
 
mongoose.set('strictQuery', true)
const {DB_HOST, PORT = 3000} = process.env
mongoose.connect(DB_HOST)
  .then(() => {
    app.listen(3000, () => {
    console.log(`Database connection successful!! Use our API on port: ${PORT}`)
  })
})
  .catch(error => {
    console.log(error.message)
    process.exit(1) // команда, яка закриває запущені процеси (1- закрити з невідомою помилкою)
  })



