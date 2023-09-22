const fs = require('fs/promises')//модуль FileSystem отвечает за работу с файлами в Node.js
const path = require('path')//   модуль path, який входить до стандартної бібліотеки Node.js потрібен роботи з шляхами файлової системи

const {Contact} = require('../../models/Contact')
const {ctrlWrapper } = require('../../helpers')
//const {ctrlWrapper, cloudinary} = require('../../helpers')//если используем облачное хранилище

const avatarsPath = path.resolve('public', 'avatars') // создает абсолют путь к папке public
const addContact = async (req, res, next) => {
   const {_id: owner} = req.user
   const {path: oldPath, filename} = req.file // берем старый путь к папке и имя файла
   const newPath = path.join(avatarsPath, filename) //join соединяет куски пути делая полный путь к файлу

   await fs.rename(oldPath, newPath)// перемещаем файл из папки temp в папку public
//  после того как мы переместили файл мы можем сохранять в базе ссылку на файл, и ссылка дождна быть
//  относительно адреса сайта, если это http://localhost:3000/api/contacts, то ссылка это /api/contacts
   const avatarUrl = path.join('avatars', filename)//создаем путь к файлу относительно адреса сервера

  //const {url: avatarUrl} = await cloudinary.uploader.upload(oldPath, {folder: 'avatars'})// если пользуемся облач хранилищем, достаем путь который будем хранить в бд
  //await fs.unlink(oldPath)//если пользуемся облач хранилищем,удаляем файл из папки временного хранения
  const result = await Contact.create({...req.body, avatarUrl, owner})//благодаря мидлваре app.use(express.json())
    // в req.body находится объект 
// {
//   "name": "John Doe",
//   "email": "john@example.com",
//   "phone": "555-1234"
// } содержащий данные, отправленные в формате JSON в теле запроса
//avatar - помещаем в базу данных ссылка на перемещенный файл



  res.status(201).json(result)
}

module.exports = {
    addContact: ctrlWrapper(addContact),
}