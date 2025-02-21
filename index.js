import express from 'express'

const app = express()
const port = 3000

let teaData = []
let nextId = 1

app.use(express.json())

// Create the tea
app.post('/tea', (req, res) => {
    const { name, price } = req.body

    if (!name || price === undefined) {
        return res.status(400).send({ error: 'Name and price are required' })
    }

    const newTea = { id: nextId++, name, price }
    teaData.push(newTea)
    res.status(201).send(newTea)
})

// Read all teas
app.get('/tea', (req, res) => {
    res.status(200).send(teaData)
})

// Read a specific tea by ID
app.get('/tea/:id', (req, res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id))
    if (!tea) {
        return res.status(404).send({ error: 'Tea not found' })
    }
    res.status(200).send(tea)
})

// Update the Tea
app.put('/tea/:id', (req, res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id))
    if (!tea) {
        return res.status(404).send({ error: 'Tea not found' })
    }

    const { name, price } = req.body
    if (!name || price === undefined) {
        return res.status(400).send({ error: 'Name and price are required' })
    }

    tea.name = name
    tea.price = price
    res.status(200).send(tea)
})

// Delete tea
app.delete('/tea/:id', (req, res) => {
    const index = teaData.findIndex(t => t.id === parseInt(req.params.id))
    if (index === -1) {
        return res.status(404).send({ error: 'Tea not found' })
    }
    teaData.splice(index, 1)
    return res.status(204).send()
})

// Start the server
app.listen(port, () => {
    console.log(`Server is running at port: ${port}...`)
})
