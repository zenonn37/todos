var express = require('express')
var bodyParser = require('body-parser');
var _ = require('underscore');
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
   var match = _.findWhere(todos,{id:todoId});
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

   var bodySafe  = _.pick(body,'completed','description');

   if (!_.isBoolean(body.completed) || !_.isString(body.description
   || body.description.trim().length === 0)) {
     return res.status(400).send();
   }

     var trimDescription = bodySafe.description.trim();
     var completed = bodySafe.completed;
     console.log(bodySafe);
   todos.push({
     id:NextId,
     description:trimDescription,
     completed:completed
   })
     NextId += 1;


   res.json(body);
 });
var port = process.env.PORT || 4040;
app.listen(port,function() {
  console.log("running",port);
});
