const mongoose = require('mongoose')
const Joi = require('joi')
const {handleMongooseError, runValidateAtUpdate} = require('../helpers')
const contactSchema = new mongoose.Schema (

{
    name: {
      type: String,
      minlength: 2,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    avatar: {
      type: String,
     },
    owner: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'user',
      required: true,
  },
  

  }
)
contactSchema.post('save', handleMongooseError)
contactSchema.pre('findOneAndUpdate', runValidateAtUpdate)
contactSchema.post('findOneAndUpdate', handleMongooseError)

const addSchema = Joi.object({
    name: Joi.string().required().messages({"any.required": "missing required name field"}),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean().required().messages({"any.required": "missing required name field"}),
  })

const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required(),
  });

const Contact = mongoose.model('contact', contactSchema)

const schemas = {
    addSchema,
    updateFavoriteSchema,
}

module.exports = {
    Contact,
    schemas,
}