const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'));
app.use('/static', express.static('static'));
app.use(express.urlencoded());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/html/index.html');
});
app.post('/contact', (req, res) => {
  name = req.body.name
  email = req.body.email
  num = req.body.num
  sub = req.body.sub
  t = req.body.t

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ngi563980@gmail.com',
      pass: 'nitin12@'
    }
  });

  var mailOptions = {
    from: 'ngi563980@gmail.com',
    to: req.body.email,
    subject: `${sub}`,
    text: `hello I am ${name} [email : ${email} , Number : ${num}] and ${t}`
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }

  });
  const file = JSON.stringify(req.body);
  fs.writeFileSync('data.json', file, (err) => {
    console.log(err);
  })

  res.render('contact', { n: `${name}`, nu: `${num}`, e: `${email}` });
});

app.get('/app',(req, res)=>{
  const re = fs.readFileSync('data.json',(err)=>{
    console.log(err);
  });
  const r = JSON.parse(re);
  res.render('app', { n: r.name , nu: r.num , e: r.email,s: r.sub,te: r.t });
});

app.listen(port, () => {
  console.log('hello I am working ');
});