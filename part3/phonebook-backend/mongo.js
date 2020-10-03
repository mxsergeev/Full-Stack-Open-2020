const mongoose = require('mongoose')

const password = process.argv[2]

if (!password) {
  console.log('Please, provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const url = `mongodb+srv://fullstack:${password}@fullstack.omwnd.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: process.argv[3],
  number: process.argv[4],
})

if (process.argv.length > 4) {
  person.save().then((result) => {
    console.log(`Added ${result.name} (number ${result.number}) to phonebook.`)
    mongoose.connection.close()
    process.exit(1)
  })
}
if (process.argv.length < 4) {
  Person.find({}).then((result) => {
    if (result.length < 1) {
      console.log('Phonebook is empty.')
      console.log('To add someone to the phonebook, please, provide a name and a phonenumber as arguments: node mongo.js <password> <name> <phonenumber>')
      console.log('Notice that if the name contains whitespace characters, it must be enclosed in quotes.')
      mongoose.connection.close()
      return
    }
    console.log('Phonebook:')
    result.forEach((pers) => {
      console.log(`${pers.name} ${pers.number}`)
    })
    mongoose.connection.close()
  })
}
