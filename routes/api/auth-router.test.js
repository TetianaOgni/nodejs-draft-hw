//нужно явно запустить веб-сервер и подключится к базе как это делаем в server.js
const mongoose = require('mongoose')//подключение библиотеки для работы с MongoDB
const request = require('supertest');//пакет необходимый для запросов на адресс крый тестируется (абстракция для тестирования HTTP)
const app = require('../../app')
const {User} = require('../../models/user.js')

const {DB_HOST_TEST, PORT = 3000} = process.env//чтоб ничего не поломать в бд во время тестов создаем отдельную бд в MongoDB Compass

describe('test logout route', ()=>{
  let server = null
  beforeAll(async()=>{//перед тестами нужно подключится к базе и запустить сервер
    await mongoose.connect(DB_HOST_TEST)
    server = app.listen(PORT)
  })
  afterAll(async()=>{//после тестов нужно отключится от базы и остановить сервер
    await mongoose.connection.close()
    server.close()
  })

  beforeEach (()=>{

  })
  afterEach(async()=> {
    await User.deleteMany({})
})

  test('test login with correct data', async()=>{
    //нужно сделать запрос на адрес /login для этого нужен пакет supertest 
    const registerData = {
        password: '000006',
        email: 'ttt@gmail.com',  
        subscription: 'starter',
        
    }
    const {statusCode, body} = await request(app).post('/api/users/register').send(registerData)
    expect(statusCode).toBe(201)
    expect(body.email).toBe(registerData.email)
    
    
    const user = await User.findOne({email: registerData.email});
        expect(user.email).toBe(registerData.email);

  })
})

// test('test login with correct data', async () => {
//     const loginData = {
//         email: 'tatianaognivenko@gmail.com',
//     }
    // const { statusCode, body } = await request(app).post('/api/users/login').send(loginData);
    // expect(statusCode).toBe(200);
    // // expect(body.token).toBeDefined() // Проверяем наличие токена
    // expect(body.user.email).toBe(loginData.email);
    // expect(body.user.subscription).toBeDefined() // Проверяем наличие поля "subscription" в пользователе

      
//     const user = await User.findOne({email: loginData.email})
//     expect(user.email).toBe(login.email)
// })
// })