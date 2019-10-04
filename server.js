const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const env = require('dotenv').config();
const app = express();
const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true });


app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/api/test', (req, res)=>{
  nightmare
  .goto(req.query.loginURL || process.env.url)
  .wait(3000)
  .click('#CompanyId')
  .wait(1000)
  .type('#CompanyId', req.query.companyId || process.env.companyID)
  .wait(1000)
  .click('#Username')
  .wait(1000)
  .type('#Username', req.query.username || process.env.username)
  .wait(1000)
  .click('#Password')
  .wait(1000)
  .type('#Password', req.query.password || process.env.password)
  .wait(1000)
  .click('button.button.full-width.margin-bottom.submit-button.login-button')
  .wait(2000)
  .evaluate(()=>{
    return document.querySelector('label[for=ChallengeAnswer]').innerText
  })
  .then((res)=>{
      if(res === process.env.questionOne){
        return(nightmare.type('#ChallengeAnswer', process.env.answerOne))
      }
      if(res === process.env.questionTwo){
        return(nightmare.type('#ChallengeAnswer', process.env.answerTwo))
      }
      if(res === process.env.questionThree){
        return(nightmare.type('#ChallengeAnswer', process.env.answerThree))
      }
    })
  .then(()=>{
    return nightmare.click('button.button.full-width.margin-bottom.submit-button')
  })
  .then(()=>{
    nightmare.end()
    .then(()=>{
      console.log('done');
    })
  })
  .catch(err=>{console.log(err)})

})

app.listen(process.env.PORT || 8080, ()=>{
    console.log(`Server is listening on port ${process.env.PORT || 8080}`)
});