var express = require('express')
var bodyParser = require('body-parser');
var app = express();
var todos = [

];
var NextId = 1;

app.use(bodyParser.json());
app.get('/',function(req,res) {
  res.send('heroku');
});
app.get('/todos',function(req,res) {
  console.log(todos);
  res.json(todos);
});
app.get('/todos/:id',function(req,res) {
  console.log('called');

  var todoId = parseInt(req.params.id,10);
   var match;
   todos.forEach(function(todo) {
     if (todoId === todo.id) {
       match = todo;
     }
   });
   if (match) {
     res.json(match);
   }else {
     res.status(404).send();
   }
   //res.send("You asked for "+req.params.id);
})
app.post('/todos',function(req,res) {
  //varNextId
   var body = req.body;
   

   todos.push({
     id:NextId,
     description:body.description,
     completed:false
   })
     NextId += 1;


   res.json(body);
 });
var port = process.env.PORT || 4040;
app.listen(port,function() {
  console.log("running",port);
});
