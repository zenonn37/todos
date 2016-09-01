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
//todos?completed=true&q=Node
app.get('/todos',function(req,res) {
  //returns an object/key value pairs;
  var query =  req.query;

  var filteredTodos = todos;
  if (query.hasOwnProperty('completed') && query.completed === 'true') {
     filteredTodos = _.where(todos,{completed:true});

  }else if (query.hasOwnProperty('completed') && query.completed === 'false') {
      filteredTodos = _.where(todos,{completed:false});


   }


   if (query.hasOwnProperty('q') && query.q.length > 0) {
       filteredTodos = _.filter(filteredTodos,function(todo) {
         return todo.description.toLowerCase().indexOf(query.q.toLowerCase()) > -1;
        //return query.q === todo.description;

     });

     //return res.json(filteredTodos);
   }


    //console.log('called');
    res.json(filteredTodos);


  console.log(query);



  //res.json(filteredTodos);
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


   res.json(bodySafe);
 });

   app.delete('/todos/:id',function(req,res) {
     var todoId = parseInt(req.params.id,10);

     var t = _.findWhere(todos,{id:todoId});
       if (!t) {
         res.status(404).json({"error":"No todo found"});
         return;
       }
       var bodySafe  = _.pick(body,'completed','description');

       if (!_.isBoolean(body.completed) || !_.isString(body.description
       || body.description.trim().length === 0)) {
         return res.status(400).send();
       }

      todos =  _.without(todos,t);

     console.log(todos);
      res.json(t);


   });

   app.put('/todos/:id',function(req,res) {
       var todoId = parseInt(req.params.id,10);
       var t = _.findWhere(todos,{id:todoId});
         if (!t) {
           res.status(404).json({"error":"No todo found"});
           return;
         }

       var body = _.pick(req.body,'completed','description');
       var validAtrributes = {};

       if (body.hasOwnProperty('completed') && _.isBoolean(body.completed)) {
           validAtrributes.completed = body.completed;
       }else if (body.hasOwnProperty('completed')) {
         return res.status(400).send();
       }

       if (body.hasOwnProperty('description') && _.isString(body.description)
     && body.description.trim().length > 0) {
         validAtrributes.description = body.description;
       }else if (body.hasOwnProperty('description')) {
         return res.status(400).send();
       }

        _.extend(t, validAtrributes);
        res.json(t);

   });
var port = process.env.PORT || 4040;
app.listen(port,function() {
  console.log("running",port);
});
