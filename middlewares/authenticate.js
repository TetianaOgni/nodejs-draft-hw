// middlevware для перевірки токена
const jwt = require('jsonwebtoken')//пакет к-рый позволяет шифровать и расшифровывать jwt-токены
const {User} = require('../models/user')
const {HttpError} = require('../helpers')
const {SECRET_KEY} = process.env// получаем переменную окружения из объекта process.env

const authenticate = async (req, res, next) => {
   const {authorization = ''} = req.headers
   const [bearer, token] = authorization.split(' ')
   if (bearer !== 'Bearer'){
     next(HttpError(401, 'Not authorized')) // спрацьовує коли нема баєра а значить і токена теж
   }
   try {
        const {id} = jwt.verify(token, SECRET_KEY) // отримуємо id користувача из токена
        const user = await User.findById(id) // знаходимо конкретного користувача по цьому id
        if(!user || !user.token || user.token !== token) { // якщо користувача нема або токена нема або токен не відповідає дійсному 
        res.setHeader('Content-Type', 'application/json')
            next(HttpError(401, 'Not authorized')) // повинени спрацьовувати коли такого юзера вже нема у базі, а час діі токена ще не сплив
        }
// записуємо в обʼєкт користувача який робив запит, тк req один на один запит в інших файлах ми отримуємо инфу про цього користувача  
        req.user = user
        next()

   }
   catch {
    next(HttpError(401, 'Not authorized'))//спрацьовує коли токен є але він не вірній може час діі сплив
   }
}

module.exports = authenticate