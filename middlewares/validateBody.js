const {HttpError} = require('../helpers')

const validateBody = schema => {
    const func = (req, res, next) => {
       const {error} = schema.validate(req.body)
       if (error) {
        next(HttpError(400,  error.message))//сюди приходить текст помилки стандартний с Joi,
        //  або ваш якщо прописати його у схеміjoi
       }
       next()
    }
    return func
}
module.exports = validateBody
