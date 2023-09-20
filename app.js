const express = require('express')
const logger = require('morgan')
const cors = require('cors')//Cross-Origin Resource Sharing) - это механизм веб-безопасности, 
                           // который позволяет или ограничивает веб-приложениям выполнять запросы к ресурсам 
                          //  (например, изображениям, стилям, скриптам и данным API) на других доменах (или портах), 
                          // чем текущий домен, с которого была загружена веб-страница. 

require('dotenv').config() 
const authRouter = require('./routes/api/auth')
const contactsRouter = require('./routes/api/contacts')

const app = express()//ф-я создает веб-сервер (арр - вебсервер)

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())//мидлвара позволяет серверу обрабатывать запросы с других источников
app.use(express.json())//промежуточное ПО (middleware)для обработки данных в формате JSON 
//отправляет POST или PUT запрос с данными в формате JSON, 
//это промежуточное ПО считывает данные из тела запроса, разбирает JSON
// и помещает их в свойство req.body.
// это мидлвара не срабатывает кодга приходят данные в запросе с Content-Type не json
// app.use() // это мидлвара срабатывает кодга приходят данные в запросе с Content-Type form-data
//файлы сложит во времен. папку а контроллеру передаст данные об этом файле записанные в req.file,
//  а json данные запишет в req.body

app.use('/api/users', authRouter)
app.use('/api/contacts', contactsRouter)
 
app.use((req, res) => {  
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  const {status = 500, message = 'Server error'} = err
  res.status(status).json({ message, })
})

module.exports = app
