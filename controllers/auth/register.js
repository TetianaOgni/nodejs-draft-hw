const gravatar = require('gravatar')//библиотека для генерации url-адресов шаблонных аватарок в Node.js
const bcrypt = require('bcrypt')
const {User} = require('../../models/user')
const {HttpError, ctrlWrapper} = require('../../helpers')

const register = async(req, res) => {
  const {email, password, subscription} = req.body
  const user = await User.findOne({email})
  
  if (user) {
    return res.status(409).header('Content-Type', 'application/json').json({
      message: 'Email in use',
    });
  }
  
 const hashPassword = await bcrypt.hash(password, 10)
  const avatarUrl = gravatar.url(email, {protocol: 'http', s: '100'})// метод url принимает email пользователя и возвращает ссылку на временную аватарку
  const newUser = await User.create({...req.body, password: hashPassword, avatarUrl})//сохраняем в бд захешированный пароль и ссылку на вр аватакру
  
  const responseBody = {
    user: {
      email: email,
      subscription: subscription,
    },
  };
  res.status(201).header('Content-Type', 'application/json').json(responseBody);
 
}

module.exports = {
  register: ctrlWrapper(register), 
}

