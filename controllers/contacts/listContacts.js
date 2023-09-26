const {Contact}= require('../../models/Contact')
const {ctrlWrapper }= require('../../helpers')
// обработчик маршрута '/'
//обр. маршрута содержит req - объект запроса, res - объект ответа
// содержит инф о входящем HTTP-запросе от клиента
//Методы в объекте ответа (res), могут передавать ответ клиенту и завершать цикл “запрос-ответ”
// Если ни один из методов не будет вызван из обработчика маршрута, клиентский запрос зависнет.
const listContacts = async (req, res) => {
    const {_id: owner} = req.user//тк мы использ-м аутентификацию, req.user объект пользователя, представляющий текущего авторизованного пользователя.
    const {page = 1, limit = 10, favorite} = req.query//req.query помогает получит параметры запроса, извлеченные из URL-строки запроса
    const skip = (page - 1) * limit
   const result = await Contact.find({owner}, '-versionKey', {skip, limit, favorite}).populate('owner', 'name email')  
   //populate повертає інфу про користувача, принимает перш. арг. що найти, а другим - що конкретно передать
   res.json(result)//метод res.json() - отправка ответа JSON
}
module.exports = {
    listContacts: ctrlWrapper(listContacts),
}