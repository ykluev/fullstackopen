const express = require('express')
const app = express()

// NEED THIS TO PARSE JSON
app.use(express.json())


let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Hello World</h1>')
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})


const generateID = () => {
    let id = Math.random()*1423 | 0 // large prime number - less collisiions

    while (persons.find(person => person.id === id)) {
        id = Math.random()*1423 | 0
    }

    return id.toString() 
}

app.post( '/api/persons', (request, response) => {
    // generate ID
    const body = request.body

    if (!body.name) {
        return response.status(404).json({
            error: 'missing name'
        })
    }
    
    if (!body.number){
        return response.status(404).json({
            error: 'missing number'
        })
    }

    const same_name = persons.find(person => person.name === body.name)

    if (same_name) {
        return response.status(404).json({
            error: 'name must be unique' 
        })
    }

    const person = {
        id: generateID(),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person)

    response.json(person)

})


app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    // only leave the persons that do not match the id
    persons = persons.filter(person => person.id !== id)

    // do not need a body for delete. only status code
    response.status(204).end()
})


app.get('/info', (request, response) => {
    date_str = Date().toString()
    message = `Phonebook has info for ${persons.length} people <br> ${date_str}`
    response.send(message)
})



const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)