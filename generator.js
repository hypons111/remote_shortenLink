const mongoose = require('mongoose')
const Link = require('./models/link')



function generator() {
  const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
  let code = ''

  while (code.length < 5) {
    code += digits[Math.floor(Math.random() * digits.length)]
  }

  const shortenLink = 'https://phase2.3_A14_Shortenlink.herokuapp.com/' + code

  let uniqueCode = Link.find({ code: code })

  // 防止有重覆的網址組合出現
  if (uniqueCode._conditions.code !== code) {
    generator()
  } else {
    return code
  }
  console.log('data uploaded')
}




module.exports = generator


