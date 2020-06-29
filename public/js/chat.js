// const { $where } = require("../../models/user");

$(document).ready(function(){
    //we need to get id from "hidden" input in message.ejs
    var id=$('#receiverId').val();

    $('#message').click(function(){
        var message=$.trim($('#msg').val());

        if (message!='') {
            $.post('/message/'+id,{
                message:message,
                id:id
            },function(data){
                $('#msg').val('');
            });
        }
    });
    //to reset afte senrd
    setInterval(function(){
        $('.msg').load(location.href+' .msg');
    },200)
});