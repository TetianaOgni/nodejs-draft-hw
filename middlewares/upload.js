const multer = require('multer') // это промежуточное ПО (middleware) фреймворка Express, 
// которая используется при загрузке файлов для обработки multipart/form-data
const path = require('path')
const destination = path.resolve('temp')//resolve - це метод Node.js,який будує абсолютний шлях на основі відносного шляху або кількох відносних шляхів.

const multerConfig = multer.diskStorage({//налаштування збереження завантажених файлів
    destination,//путь где будет храниться файл временно 
    filename: (req, file, cb)=>{//определяет под каким именем будет храниться файл
    // req -тело запроса, file -файл к-рый multer прочитал и хранит в памяти браузера, cb - ф-я колбек
    // cb(null, file.originalname) // если не приходит ошибка ставим null, если хотим оставить прежнее имя файла - file.originalname   
    const uniquePrefix = `${Date.now()}_${Math.round(Math.random() * 1E9)}`;// если надо дать уникальное имя кажд файлу
    const filename = `${uniquePrefix}_${file.originalname}`;
    cb(null, filename);
}
})
const limits = {
    fileSize: 1024 * 1024 * 5 // ограничение размера файла к-рый можно загружать,
    //  указывается в байтах(файлы больше 5 мегабайтов не загрузятся)
    // (2 ^ 10) - 1024 байти дорівнюють 1 кілобайту, і 1024 кілобайти дорівнюють 1 мегабайту 
}

const upload = multer({
    storage: multerConfig,
    limits, 
})

module.exports = upload
    