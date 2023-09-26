const {register, login, getCurrent, logout, updateAvatar} = require('./auth')
const {listContacts, getContactById, addContact, removeContact,  updateContact, updateStatusContact} = require('./contacts')
module.exports = {
    register,
    login,
    getCurrent,
    logout,
    updateAvatar,
    listContacts,
    getContactById,
    addContact,
    removeContact,
    updateContact,
    updateStatusContact
}