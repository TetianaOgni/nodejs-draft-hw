// маршрутизатор Express.js, который определяет различные маршруты для управления 
//контактами и использует различные методы маршрутизатора для обработки запросов HTTP.

const express = require('express')
const ctrl = require('../../controllers')
const {validateBody, isValidId, authenticate, upload} = require('../../middlewares')
const {schemas} = require('../../models/Contact')

const router = express.Router()//создается экземпляр маршрутизатора 

// router.use(authenticate) // можна не прописувать у кожному запиті authenticate, а заробити це так

// Маршрутизатор будет использоваться для определения маршрутов 
// и их соответствующих обработчиков.
// методы маршрутизатора соответствуют HTTP-запросам
//когда метод совпадает с HTTP-запросом , то для соответствующего маршута(при совпадении маршрута маршрутизатора и маршрут HTTP-запроса)
// будет применен определенный обработчик маршрута и мидлвара если есть/
// в маршрутизаторе здесь первый аргумент - маршрут
// последний аргумент - обработчик маршрута (напр ctrl.listContacts)
// между ними находятся мидлвары (промежуточные обработчики) тут это authenticate, isValidId,  validateBody
router.get('/', authenticate, ctrl.listContacts)

router.get('/:id', authenticate, isValidId, ctrl.getContactById)

router.post('/', authenticate, upload.single('avatarUrl'), validateBody(schemas.addSchema), ctrl.addContact)
// upload.fields([{name: 'avatar', maxCount: 1}, {name: 'foto', maxCount: 3}]) - если ждем в нескольких полях файлы
// upload.array('avatar', 8) - если ждем несколько файлов одном поле 'avatar', указываем сколько файлов
// upload.single('avatar') - если ждем т-ко один файл в одном поле 'avatar'

router.delete('/:id', authenticate, isValidId, ctrl.removeContact)

router.put("/:id", authenticate, isValidId,  validateBody(schemas.addSchema), ctrl.updateContact);

router.patch('/:id/favorite', authenticate, isValidId, validateBody(schemas.updateFavoriteSchema), ctrl.updateStatusContact)

module.exports = router

//Промежуточные обработчики (мидлвары) предназначены для выполнения определенных операций на уровне запроса и ответа, 
//таких как аутентификация, проверка данных, логирование и другие промежуточные действия. 
//мидлвары обычно не отправляют непосредственные ответы клиенту.
//обработчики маршрута предназначены для обработки конкретных маршрутов и отправки ответов клиенту
