require('dotenv').config()
const express = require('express')

const app = express()
const morgan = require('morgan')
const cors = require('cors')

const Person = require('./models/person')

app.use(express.static('build'))

app.use(cors())
app.use(express.json())

morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

// let persons = [
//     {
//       "name": "Arto Hellas",
//       "number": "040-123456",
//       "id": 1
//     },
//     {
//       "name": "Ada Lovelace",
//       "number": "39-44-5323523",
//       "id": 2
//     },
//     {
//       "name": "Dan Abramov",
//       "number": "12-43-234345",
//       "id": 3
//     },
//     {
//       "name": "Mary Poppendieck",
//       "number": "39-23-6423122",
//       "id": 4
//     }
// ]

app.get('/', (req, res) => {
  res.send('Working fine!')
})

app.get('/api/info', (req, res) => {
  Person.find({}).then((persons) => {
    const info = `
      <p>Phonebook has info for ${persons.length} people.</p>
      <div>${new Date()}</div>
    `
    res.send(info)
  })
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons)
  })
})

app.post('/api/persons', (req, res, next) => {
  const { body } = req

  if (!body.name || !body.number) {
    res.status(400).json({
      error: 'Person information missing.',
    })
    return
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person
    .save()
    .then((savedPerson) => res.json(savedPerson))
    .catch((err) => next(err))
})

app.put('/api/persons/:id', (req, res, next) => {
  const person = {
    name: req.body.name,
    number: req.body.number,
  }
  console.log(person)

  Person.findByIdAndUpdate(req.params.id, person,
    { new: true, runValidators: true, context: 'query' })
    .then((updatedPerson) => {
      res.json(updatedPerson)
    })
    .catch((err) => next(err))
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch((err) => next(err))
})

app.delete('/api/persons/:id', (req, res) => {
  Person.findByIdAndDelete(req.params.id)
    .then((result) => {
      if (result) {
        res.status(200).json({
          message: `Successfully deleted ${result.name}`,
        })
      } else {
        res.status(204).end()
      }
    })
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'Unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (err, req, res, next) => {
  const errors = Object.values(err.errors).map((e) => e.properties.message)

  if (err.name === 'CastError') {
    res.status(404).send({
      error: 'Malformatted id',
    })
    return
  }

  if (err.name === 'ValidationError') {
    res.status(400).send({
      error: errors,
    })
    return
  }

  next(err)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
