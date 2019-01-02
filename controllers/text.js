const textRouter = require('express').Router()
const request = require('request')
let data = null
const address = 'http://johneagle.omat.fi/external/api/json/text.json'

request(address, function (error, response, body) {
  if (!error && response.statusCode == 200) {
     const trimmed = body.trim()
     data = JSON.parse(trimmed)
  }
})

textRouter.get('/', async (request, response) => {
  response.json(data)
})

module.exports = textRouter