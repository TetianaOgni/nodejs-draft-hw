const {Contact}= require('../../models/Contact')
const {ctrlWrapper }= require('../../helpers')

const listContacts = async (req, res) => {
    const {_id: owner} = req.user
    const {page = 1, limit = 10, favorite} = req.query
    const skip = (page - 1) * limit
   const result = await Contact.find({owner}, '-versionKey', {skip, limit, favorite}).populate('owner', 'name email')  
   //populate повертає інфу про користувача, принимает перш. арг. що найти, а другим - що конкретно передать
   res.json(result)
}
module.exports = {
    listContacts: ctrlWrapper(listContacts),
}