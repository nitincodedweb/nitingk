const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'));
app.use('/static',express.static('static'));
app.use(express.urlencoded());

app.get('/',(req, res)=>{
  res.sendFile(__dirname + '/html/index.html');
});
app.post('/contact',(req, res)=>{
  name = req.body.name
  num = req.body.num
  email = req.body.email
  res.render('contact',{n:`${name}`,nu:`${num}`,e:`${email}`})
})

app.listen(port,()=>{
  console.log('hello I am working ');
});

