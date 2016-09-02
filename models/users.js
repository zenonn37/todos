var bcrypt = require('bcrypt');
var _ = require('underscore');
var cryptojs = require('crypto-js');
var jwt = require('jsonwebtoken');

module.exports = function(sequelize, DataTypes) {
  return user = sequelize.define('user',{

      email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
        validate:{
          isEmail:true
        }
      },
      salt:{
        type:DataTypes.STRING
      },
      password_hash:{
        type:DataTypes.STRING
      },
      password:{
        type:DataTypes.VIRTUAL,
        allowNull:false,
        validate:{
          len:[4,100]
        },
        set:function(value) {
           var salt = bcrypt.genSaltSync(10);
           var hashedPassword = bcrypt.hashSync(value,salt);

           this.setDataValue('password',value);
           this.setDataValue('salt',salt);
           this.setDataValue('password_hash',hashedPassword);
        }

      }
  },{
    hooks:{
    beforeValidate:function(user,options) {
      if (typeof user.email === 'string') {
            return user.email = user.email.toLowerCase();

      }
    }

  },
  classMethods:{
     authenticate: function(body) {
       return new Promise(function(resolve, reject) {

             if (!body.hasOwnProperty('email') || !_.isString(body.email)) {
               return res.status(404).send('error');
             }

             if (!body.hasOwnProperty('password') || !_.isString(body.password)) {
               return res.status(404).send('error');
             }

                 user.findOne({
                  where:{
                    email:body.email
                  }
               })
                .then(function(user) {
                  if (!user || !bcrypt.compareSync(body.password, user.get('password_hash'))) {
                     reject();
                    return;
                  }
                    resolve(user);

                },function(e) {
                  reject();
                })

       });
     },
     findByToken(token){
       return new Promise(function(resolve, reject) {
         try {
           var decoded = jwt.verify(token,'qwerty098');
           var bytes = cryptojs.AES.decrypt(decoded.token,'acg443@');
           var tokenData = JSON.parse(bytes.toString(cryptojs.enc.Utf8));

           user.findById(tokenData.id)
            .then(function(user) {
                if (!user) {
                  reject();
                  return;
                }
                resolve(user);
            },function(e) {
              reject();
            })
         } catch (e) {
           reject();
         }
       });
     }
  },
  instanceMethods:{
    toPublicJSON:function() {
      var json = this.toJSON();
      return _.pick(json,'id','email','updatedAt','createdAt');


    },
    generateToken:function(type) {
      if (!_.isString(type)) {
        return undefined;
      }
      try {
        var stringData = JSON.stringify({id:this.get('id'),type:type});
          var encryptionData = cryptojs.AES.encrypt(stringData,'acg443@').toString();
          var token = jwt.sign({
            token:encryptionData
          },'qwerty098');
          return token;
      } catch (e) {
        return undefined;
      }
    }
  }
});
return user;
};
