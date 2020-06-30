const port = process.env.PORT || 3000
const express = require('express')
const app = express()
const expHan = require('express-handlebars')
const bodPar = require('body-parser')
const metOve = require('method-override')
const mongoose = require('mongoose')
const generator = require('./generator.js')
const Link = require('./models/link')
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/link'


mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => console.log('mongodb error'))
db.once('open', () => console.log('mongodb connected'))


app.engine('handlebars', expHan({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodPar.urlencoded({ extended: true }))
app.use(metOve('_method'))



app.get('/', (req, res) => res.render('index'))

app.post('/url', (req, res) => {
  const originLink = req.body.link
  const shortenLink = generator()
  return Link.create({ originLink, shortenLink })
    .then(() => Link.find({ originLink: originLink })
      .then(() => res.render('show', { originLink, shortenLink }))
      .catch(error => console.log('error'))
    )
})

// app.get('http://localhost:3000/https://phase2.3_A14_Shortenlink.herokuapp.com/:shortenLink', (req, res) => {

app.get('/:shortenLink', (req, res) => {
  const shortenLink = req.params.shortenLink
  Link.find({ shortenLink: shortenLink })
    .then(data => res.redirect("https://" + data[0].originLink))
})


app.listen(port, () => console.log(`This app is running on http://localhost${port}`))

// "https://phase2.3_A14_Shortenlink.herokuapp.com/" + 