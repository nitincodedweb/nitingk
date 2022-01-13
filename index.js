const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use('/static',express.static('static'))
app.get('/',(req, res)=>{
  res.sendFile(__dirname + '/html/index.html');
});

app.listen(port,()=>{
  console.log('hello I am working ');
});

