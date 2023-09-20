const express = require('express')
const ctrl = require('../../controllers')
const {validateBody, isValidId, authenticate, upload} = require('../../middlewares')
const {schemas} = require('../../models/Contact')

const router = express.Router()

router.get('/', authenticate, ctrl.listContacts)

router.get('/:id', authenticate, isValidId, ctrl.getContactById)
// upload.fields([{name: 'avatar', maxCount: 1}, {name: 'foto', maxCount: 3}]) - если ждем в нескольких полях файлы
// upload.array('avatar', 8) - если ждем несколько файлов одном поле 'avatar', указываем сколько файлов
// upload.single('avatar') - если ждем т-ко один файл в одном поле 'avatar'
router.post('/', upload.single('avatar'), authenticate, validateBody(schemas.addSchema), ctrl.addContact)

router.delete('/:id', authenticate, isValidId, ctrl.removeContact)

router.put("/:id", authenticate, isValidId,  validateBody(schemas.addSchema), ctrl.updateContact);

router.patch('/:id/favorite', authenticate, isValidId, validateBody(schemas.updateFavoriteSchema), ctrl.updateStatusContact)

module.exports = router
