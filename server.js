var express = require('express')
var app = express();
var todos = [
  {
    id:1,
    description: 'Meet for Cake',
    completed:false,
},
{
  id:2,
  description: 'Go to Store',
  completed:false,
},
{
  id:3,
  description: 'Go to Work',
  completed:true,
}
];


app.get('/',function(req,res) {
  res.send('heroku');
});
app.get('/todos',function(req,res) {
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
var port = process.env.PORT || 4040;
app.listen(port,function() {
  console.log("running",port);
});
