const mongoose = require('mongoose')
const Link = require('./models/link')

// const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/link'


// mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
// const db = mongoose.connection
// db.on('error', () => console.log('mongodb error'))
// db.once('open', () => console.log('mongodb connected'))


function generator() {
  const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
  let code = ''

  while (code.length < 5) {
    code += digits[Math.floor(Math.random() * digits.length)]
  }

  const shortenLink = 'https://phase2.3_A14_Shortenlink.herokuapp.com/' + code


  let uniqueCode = Link.find({ code: code })

  if (uniqueCode._conditions.code !== code) {
    generator()
  } else {
    return code
  }

}




module.exports = generator



// "https://phase2.3_A14_Shortenlink.herokuapp.com/ecwyy"


