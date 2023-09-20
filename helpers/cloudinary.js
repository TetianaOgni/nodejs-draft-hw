const cloudinary = require('cloudinary').v2//экспортируем именно вторую версию клаудинари для хранения в облачном хранилище

const {CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SICRET} = process.env // Забираем секретные данные из env

cloudinary.config({  // робимо налаштування параметрів для підключення сервису Cloudinary з використанням отриманих конфіденційних даних
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SICRET,
})

module.exports = cloudinary