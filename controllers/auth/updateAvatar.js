const fs = require('fs/promises')//модуль FileSystem отвечает за работу с файлами в Node.js
const path = require('path')//   модуль path, який входить до стандартної бібліотеки Node.js потрібен роботи з шляхами файлової системи

const { ctrlWrapper } = require("../../helpers")
const {User} = require('../../models/user')

const avatarsPath = path.resolve('public', 'avatars') // создает абсолют путь к папке public

const updateAvatar = async(req, res)=>{
    
   const {_id} = req.user
   const {path: oldPath, filename} = req.file // берем старый путь к папке и имя файла
   const newPath = path.join(avatarsPath, filename) //join соединяет куски пути делая полный путь к файлу
   await fs.rename(oldPath, newPath)// перемещаем файл из папки temp в папку public
   const uniqFilename = `${_id}_${filename}`//делает имя файла уникальным,тоже самое мы делали в upload лучше выбрать что-то одно или будет слишком длинное имя 
   const avatarUrl = path.join('avatars', uniqFilename)
   await User.findByIdAndUpdate(_id, {avatarUrl})
    
    res.status(200).header('Content-Type', 'application/json').json({
        avatarUrl
    })
}


module.exports = {
    updateAvatar: ctrlWrapper(updateAvatar), 
  }