const port = process.env.PORT || 3000
const express = require('express')
const app = express()
const expHan = require('express-handlebars')
const bodPar = require('body-parser')
const mongoose = require('mongoose')
const generator = require('./generator.js')
const Link = require('./models/link')
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/storten-link'
const host = "https://conservative-parliament-43220.herokuapp.com/" || "http://localhost:3000/"


mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => console.log('mongodb error'))
db.once('open', () => console.log('mongodb connected'))


app.engine('handlebars', expHan({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodPar.urlencoded({ extended: true }))


app.get('/', (req, res) => {
  res.render('index')
})

app.post('/url', (req, res) => {
  let originLink = req.body.link

  // prevent empty input 
  if (!originLink) {
    res.render('show')
  } else {

    // check if new url already exists in db 
    let existsData = []
    Link.find({ originLink: originLink })
      .then(data => existsData = data)
      .then(data => {
        if (existsData.length === 0) {
          const code = generator()
          return Link.create({ originLink, code })
            .then(() => Link.find({ originLink: originLink }))
            .then(() => res.render('show', { originLink, code, host }))
            .catch(error => console.log('error'))
        } else {
          Link.find({ originLink: originLink })
            .lean()
            .then(data => res.render('show', { originLink: data[0].originLink, code: data[0].code, host }))
        }
      })
  }
})

app.get('/:code', (req, res) => {
  const code = req.params.code
  Link.find({ code: code })
    .then(data => res.redirect(data[0].originLink))
})


app.listen(port, () => console.log(`This app is running on http://localhost${port}`))

