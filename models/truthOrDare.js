const mongoose = require('mongoose')

const truthOrDareSchema = new mongoose.Schema({
  content: String,
  type: String
})

truthOrDareSchema.statics.format = (truthOrDare) => {
  return {
    id: truthOrDare.id,
    content: truthOrDare.content,
    type: truthOrDare.type
  }
}

const TruthOrDare = mongoose.model('TruthOrDare', truthOrDareSchema)

module.exports = TruthOrDare
