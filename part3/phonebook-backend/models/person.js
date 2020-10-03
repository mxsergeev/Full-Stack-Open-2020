const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const url = process.env.MONGODB_URI
console.log('Connecting to', url)

mongoose.connect(url, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false,
})
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB:', err.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [3, 'Name must be at least 3 characters long.'],
    required: true,
    unique: true,
  },
  number: {
    type: String,
    minlength: [8, 'Phonenumber must be at least 8 digits long.'],
    required: true,
  },
})

personSchema.plugin(uniqueValidator)

/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
personSchema.set('toJSON', {
  transform: (doc, retDoc) => {
    retDoc.id = retDoc._id.toString(0)
    delete retDoc._id
    delete retDoc.__v
  },
})

module.exports = mongoose.model('Person', personSchema)
