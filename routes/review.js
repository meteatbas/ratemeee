var async=require('async');
const Company=require('../models/company');
const { result } = require('underscore');

module.exports=(app)=>{
    app.get('/review/:id',(req,res)=>{//params inside company-profile.ejs
        var mesg=req.flash('success');
        Company.findOne({'_id':req.params.id},(err,data)=>{
            res.render('company/review',{title:'Company Review',user:req.user,data:data,msg:mesg,hasMsg:mesg.length>0});//data means this object here
        })
    });

    app.post('/review/:id',(req,res)=>{
        async.waterfall([
            function(callback){//the company with the particular id saved into "result" object
                Company.findOne({'_id':req.params.id},(err,result)=>{
                        callback(err,result);
                });
            },
            function(result,callback){
                Company.update({
                    '_id':req.params.id
                },
                
                {//companyRating arr'ine bilgileri atıyor
                    $push:{companyRating:{
                        companyName:req.body.sender,
                        userFullname:req.user.fullname,
                        userRole:req.user.role,
                        companyImage:req.user.company.image,
                        userRating:req.body.clickedValue,
                        userReview:req.body.review
                    },
                    ratingNumber:req.body.clickedValue
                },
                $inc:{ratingSum:req.body.clickedValue}//every number pushed into rating number will sum here
                },(err)=>{
                    req.flash('success','Your review has been added');
                    res.redirect('/review/'+req.params.id);
                })
            }
        ])
    })
}
//we are using "data" in routing company 