var Sequelize = require('sequelize');

var sequelize = new Sequelize(undefined,undefined,undefined,{
  'dialect':'sqlite',
  'storage':__dirname + '/basic-sqlite-database.sqlite'
});

var Todo = sequelize.define('todo',{
  description:{
    type:Sequelize.STRING,
    allowNull:false,
    validate:{
      len:[1,250]
    }
  },
  completed:{
    type:Sequelize.BOOLEAN,
    allowNull:false,
    defaultValue:false
  }
})

sequelize.sync().then(function() {
    console.log("Good!");
     return Todo.destroy({
       where:{
         id:1
       }
     })
     .then(function(todo) {

     })
 /*
    Todo.create({
      description:'Study Node',
      completed:false
    }).then(function(data) {
         return Todo.create({
           description:'walk my Coon Cat',
           completed:true
         }).then(function() {
            //return Todo.findById(2);
            return Todo.findAll({
              where:{
                description:{
                  $like:'%cat%'
                }
              }
            })
         }).then(function(todos) {
           if (todos) {
             todos.forEach(function(todo) {
                console.log(todo.toJSON());
             });

           }else {
             console.log('no data');
           }
         })
         */
    .catch(function(error) {
      console.log(error);
    })
})
