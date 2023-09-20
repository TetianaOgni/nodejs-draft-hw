const {Contact}= require('../../models/Contact')
const {ctrlWrapper }= require('../../helpers')
const addContact = async (req, res, next) => {
    const {_id: owner} = req.user
   console.log(req.body)
   console.log(req.file)

    // const result = await Contact.create({...req.body, owner})//благодаря мидлваре app.use(express.json())
    // в req.body находится объект 
// {
//   "name": "John Doe",
//   "email": "john@example.com",
//   "phone": "555-1234"
// } содержащий данные, отправленные в формате JSON в теле запроса



    // res.status(201).json(result)
}

module.exports = {
    addContact: ctrlWrapper(addContact),
}