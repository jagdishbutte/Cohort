const express = require('express');
const app = express()

const users = [{
    name: "James",
    kidneys: [{
        healthy: false
    }]
}];

app.get('/', function (req, res) {
  const jamesKidneys = users[0].kidneys;
  const numberOfKidneys = jamesKidneys.length;
  let numberOfHealthyKidneys = 0;
  for(let i=0; i<jamesKidneys.length; i++){
    if(jamesKidneys[i].healthy){
        numberOfHealthyKidneys = numberOfHealthyKidneys + 1;
    }
  }
  const numberOfUnhealthyKidneys = numberOfKidneys - numberOfHealthyKidneys;
  res.json({
    numberOfKidneys,
    numberOfHealthyKidneys,
    numberOfUnhealthyKidneys
  })
})

app.use(express.json());

app.post('/', function (req, res) {
    const isHealthy = req.body.isHealthy;
    users[0].kidneys.push({
        healthy: isHealthy
    });
    res.json({
        msg: "Done"
    })
})

//   app.put('/', function (req, res) {
//     res.send('<b>Hello World<b>')
// })

//   app.delete('/', function (req, res) {
//     res.send('<b>Hello World<b>')
// })

app.listen(3000);