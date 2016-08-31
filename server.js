var express = require('express')
var app = express();


app.get('/',function(req,res) {
  res.send('heroku');
})
var port = process.env.PORT || 4040;
app.listen(port,function() {
  console.log("running",port);
});
