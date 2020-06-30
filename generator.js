function generator() {
  const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
  let code = ''

  while (code.length < 5) {
    code += digits[Math.floor(Math.random() * digits.length)]
  }



  return code
}

module.exports = generator