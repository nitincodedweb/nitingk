const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const nodemailer = require('nodemailer')
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000
const url = 'mongodb+srv://NitinN:NitinN@cluster0.svkla.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('hello I am connected')
  })
  .catch((err) => {
    console.log(`I am sorry \n ${err}`);
  })

const nitinSchema = new mongoose.Schema({
  name: String,
  phone: Number,
  email: String,
  gender: String,
  user: String,
  pass: String,
  check: String,
  test: String
});
const Nitin = new mongoose.model('Nitin', nitinSchema);

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use('/static', express.static('static'));
app.use('/result', express.static('file'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/html/index.html');
});
app.get('/about', (req, res) => {
  res.sendFile(__dirname + '/html/about.html');
});
app.get('/contact', (req, res) => {
  res.sendFile(__dirname + '/html/contact.html');
});

app.post('/contact',(req, res)=>{
  var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ngi563980@gmail.com',
    pass: 'nitin12@'
  }
});
name = req.body.name
email = req.body.email
num = req.body.num
sub = req.body.sub
t = req.body.t
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
res.send(`<h1 style="font-size: 6rem;color: black; font-weight: bold; "><a href="/contact" text-decoration: none; >&larr;</a></h1><h1 style="font-size: 2rem; text-align: center; "> thanks for your <br /> feedback/comment </h1>`)
});


app.get('/signup', (req, res) => {
  res.sendFile(__dirname + '/html/acount.html');
});
app.get('/signin', (req, res) => {

  res.sendFile(__dirname + '/html/acount2.html');
});
app.get('/students', (req, res) => {
  Nitin.find({ check: '1' }, { name: 1 }, function(err, Nitins) {
    if (err) return console.error(err);
    res.render('student', { num: Nitins.length, names: Nitins });
  });
})

app.post('/signup', (req, res) => {
  const ac = new Nitin(req.body)
  ac.save((err, ac) => {
    if (err) return console.error(err);
    console.log(ac);
  });
  res.redirect('/signin');
});

app.post('/signin', (req, res) => {

  Nitin.findOne(req.body, (err, Nitins) => {
    if (err) return console.error('hello  I am not working' + err);

    const file = JSON.stringify(Nitins);
    fs.writeFile('data.json', file, (err) => {
      console.log(`${err}`);
    });
    let ee;
    if(Nitins==null){
      ee = 0;
    }else{
      ee =1;
    }
    console.log(ee);
     if (ee == 1) {
      const h = Nitins.test;
      console.log(h);
      var o;
      if (h == 1) {
        o = 1;
      }
      else {
        o = 0;
      }
      if (o == 1) {
        res.sendFile(__dirname + '/html/test.html');
      }
      else {
        res.render('result', { mar: Nitins.test, n: Nitins._id });
      }
    }else {
      res.send(`<h1 style="font-size: 2rem; text-align: center; ">sorry you don't have account <br /><a href="/signup">create acount</a></h1>`)
    }

  });
  
});

app.post('/test', (req, res) => {
  const h = fs.readFileSync("data.json", (err) => {
    console.log(err);
  })
  const k = JSON.parse(h);
  console.log(k.test);

  var a;
  var b;
  var c;
  var d;
  if (req.body.f == 1) {
    a = 1;
  }
  else {
    a = 0;
  }
  if (req.body.s == 1) {
    b = 1;
  }
  else {
    b = 0;
  }
  if (req.body.t == 1) {
    c = 1;
  }
  else {
    c = 0;
  }
  if (req.body.fi == 1) {
    d = 1;
  }
  else {
    d = 0;
  }
  const e = a + b + c + d;
  if (e >= 3) {
    const w = k._id;
    res.render('result', { mar: e, n: w });
    Nitin.updateOne({ _id: `${w}` }, { $set: { test: e } }, (err, data) => {
      if (err) return console.error(err);
      console.log(data);
    });
    const da = `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>${w}</title>
        <link rel="stylesheet" href="/static/h.css">
    </head>
    
    <body>
    <div id="h">
      GK.com
    </div>
    <div id="body">
      <h1 id="c">certificate</h1>
    <p id="p"> this is satisfied that Mr./Mrs. <br /> <span id="span">${k. name}</span><br /> have good knowledge of GK by GK.com </p>
    </div>
    <div id="re">
      <h2 id="res">result</h2><br />
      <div>1st term</div> <div>${a}</div><br />
      <div>2nd term</div> <div>${b}</div><br />
      <div>3rd term</div> <div>${c}</div><br />
      <div>4rth term</div> <div>${d}</div><br />
      <div>total marks</div> <div>${e}</div><br />
    </div>
    </body>
    
    </html>`;

    fs.writeFileSync(`file/${w}.html`, da, (err) => {
      console.log(err);
    })
  }
  else {
    res.render('nore', { mar: e });
  }




});

app.listen(port, () => {
  console.log('hello I am working')
})