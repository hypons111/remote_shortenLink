const generator = require('../generator.js')
const mongoose = require('mongoose')


const Schema = mongoose.Schema

const linkSchema = new Schema({
  originLink: {
    type: String
  },
  code: {
    type: String
  }
})

module.exports = mongoose.model('Link', linkSchema)