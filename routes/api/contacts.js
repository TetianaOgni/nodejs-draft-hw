const express = require('express')
const controllers = require('../../controllers/contacts')
const router = express.Router()
const {validateBody, isValidId} = require('../../middlewares')
const {schemas} = require('../../models/Contact')

router.get('/', controllers.listContacts)

router.get('/:id', isValidId, controllers.getContactById)

router.post('/', validateBody(schemas.addSchema), controllers.addContact)

router.delete('/:id', isValidId, controllers.removeContact)

router.patch('/:id/favorite', isValidId, validateBody(schemas.updateFavoriteSchema), controllers.updateFavorite)

module.exports = router
