const truthOrDareRouter = require('express').Router()
const TruthOrDare = require('../models/truthOrDare')

truthOrDareRouter.get('/', async (request, response) => {
  const data = await TruthOrDare.find({})
  response.json(data.map(TruthOrDare.format))
})

truthOrDareRouter.post('/', async (request, response) => {
  try {
    const body = request.body

    if (body.content === undefined) {
      return response.status(400).json({ error: 'content missing' })
    }

    if (body.type === undefined) {
      return response.status(400).json({ error: 'content missing' })
    }

    const input = new TruthOrDare({
      content: body.content,
      type: body.type
    })

    const result = await input.save()

    const formated = TruthOrDare.format(result)
    response.status(201).json(formated)
  } catch(exception) {
    if (exception.name === 'JsonWebTokenError' ) {
      response.status(401).json({ error: exception.message })
    } else {
      response.status(500).json({ error: 'something went wrong...' })
    }
  }
})

module.exports = truthOrDareRouter
