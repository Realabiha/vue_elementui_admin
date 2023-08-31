const data = function () {
  const line = []
  for (let i = 1; i <= 300; i++) {
    line.push(Math.random() * 99 + 1)
  }
  return line
}

module.exports = data