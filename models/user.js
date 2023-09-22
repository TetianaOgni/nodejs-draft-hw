const {Schema, model} = require('mongoose')
const Joi = require('joi')
const {handleMongooseError, runValidateAtUpdate} = require('../helpers')

const subscriptionOptions = ["starter", "pro", "business"]
const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const userSchema = new Schema ({
    
        password: {
          type: String,
          minlength: 6,
          required: [true, 'Set password for user'],
        },
        email: {
          type: String,
          match: emailRegexp,
          required: [true, 'Email is required'],
          unique: true,
        },
        subscription: {
          type: String,
          enum: subscriptionOptions,
          default: "starter"
        },
        token: {// завдяки схемі токен можна сберегти у базі
          type: String,
         default: "",
       },
       avatarUrl: {
        type: String,
        required: true
       },
  }, {versionKey: false})

userSchema.post('save', handleMongooseError)
userSchema.pre('findOneAndUpdate', runValidateAtUpdate)
userSchema.post('findOneAndUpdate', handleMongooseError)

//валидация того что приходит на бекенд
// аватар не валидируют джоином тк мы его выдаем сами
const registerSchema = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().pattern(emailRegexp).required(), 
    subscription: Joi.string().valid('starter', 'pro', 'business').default('starter'),
})

const loginSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
})

const schemas = {
    registerSchema,
    loginSchema,
}

const User = model('user', userSchema)

module.exports = {
    User, 
    schemas,
}

