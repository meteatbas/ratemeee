var async = require('async');
var Message = require('../models/message');
var User = require('../models/user');


module.exports=(app)=>{
    app.get('/message/:id',(req,res)=>{//params inside user-message.ejs
       
            
            async.parallel([
                function(callback){
                    User.findById({'_id':req.params.id},(err,result1)=>{
                        callback(err,result1);
                     })
                },
                function(callback){
                    Message.find({'$or':[{'userFrom':req.user._id,'userTo':req.params.id},
                {'userFrom':req.params.id,'userTo':req.user._id}]},(err,result2)=>{
                    callback(err,result2);
                });//iki kombinasyonun oldugu mesajları ara
                }
            ],function(err,results){
                var data=results[0];//1. fonksiyonun sonucu
                var messages=results[1];//2. fonksiyonun sonucu

                res.render('messages/message',{title:'Company Message',user:req.user,data:data,chats:messages});//iki sonucuDa render'a aktar
            });

        });
   
   app.post('/message/:id',(req,res)=>{
    
    User.findOne({'_id':req.params.id},(err,data)=>{
        var newMessage=new Message();
        newMessage.userFrom=req.user._id //logged in users id is stored inside _id userFrom
        newMessage.userTo=req.params.id;//other users inside params.id
        newMessage.userFromName=req.user.fullname;
        newMessage.userToName=data.fullname;
        newMessage.body=req.body.message;
        newMessage.createdAt=new Date();

        console.log(newMessage);
        

        newMessage.save((err)=>{
            res.redirect('/message/'+req.params.id);
        })
    })
   });
}