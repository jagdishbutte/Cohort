const express = require('express')
const app = express()

app.get('/jagdish', function (req, res) {
  res.send('<b>Hello World<b>')
})

app.listen(3000)