const genLineData = require('./line')
module.exports = (...args) => {
  console.log(args, 'args')
  const data = {
    line: genLineData()
  }
  return data
}