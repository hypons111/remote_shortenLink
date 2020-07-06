const port = process.env.PORT || 3000
const express = require('express')
const app = express()
const expHan = require('express-handlebars')
const bodPar = require('body-parser')
const mongoose = require('mongoose')
const generator = require('./generator.js')
const Link = require('./models/link')
const MONGODB_URI = 'mongodb://localhost/storten-link' || process.env.MONGODB_URI
const host = "http://localhost:3000/" || "https://conservative-parliament-43220.herokuapp.com/"


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

  if (!originLink) {
    res.render('show')
  } else {
    let duplicatedLink = ""
    Link.find({ originLink: "https://www.facebook.com" })
      .lean()
      .then(data => console.log(data))
    // .then(data => duplicatedLink = data)
    // if (duplicatedLink == "") {
    //   const code = generator()
    //   return Link.create({ originLink, code })
    //     .then(() => Link.find({ originLink: originLink }))
    //     .then(() => res.render('show', { originLink, code, host }))
    //     .catch(error => console.log('error'))
    // } else {
    //   console.log(duplicatedLink)
    // }
  }
})


app.get('/:code', (req, res) => {
  const code = req.params.code
  Link.find({ code: code })
    .then(data => res.redirect("https://" + data[0].originLink))
})


app.listen(port, () => console.log(`This app is running on http://localhost${port}`))

