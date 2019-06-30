'use strict';

/*----------------------models---------------------------*/
 
 var User = require('../../models/userModel').User;
 var Block = require('../../models/blockUserModel').Block;


 /*--------------------APIs------------------------------*/

exports.unblockUser = function(request, response){
  if(typeof request.query.blockId == 'undefined' || request.query.blockId == null)
  {
    response.statusCode = 400;
    return response.send(
      {
        status: 'FAILURE',
        message: 'blockUserId not provided.' 
      }
    );
  }
  else
  {
    var blockId = mongoose.Types.ObjectId(request.query.blockId)  
    Block.deleteOne({_id: blockId})
    .exec(function(err, unblockDetails)
    { 
      if(err)
      {
        console.log(err);
        response.statusCode = 500;
        return response.send(
          {
            status: 'FAILURE',
            message: 'Something went wrong.' 
          }
        );
      }
      else if(unblockDetails == null)
      {
        response.statusCode = 404;
        return response.send(
          {
            status: 'FAILURE',
            message: 'No data found.' 
          }
        );
      }
      else
      {
        response.statusCode = 201;
        return response.send(
          {
            status: 'SUCCES',
            message: 'unblocked.' 
          }
        );
      }
    });
  }
}

exports.deleteUser = function(request, response) {
  if(typeof request.query.userId == 'undefined' || request.query.userId == null)
  {
    response.statusCode = 400;
    return response.send(
      {
        status: 'FAILURE',
        message: 'userId not provided.' 
      }
    );
  }
  else
  {
    var userId = mongoose.Types.ObjectId(request.query.userId);
    User.findById(userId)
    .exec(function(err, userDetails)
      { 
        if(err)
        {
          console.log(err);
          response.statusCode = 500;
          return response.send(
            {
              status: 'FAILURE',
              message: 'Something went wrong.' 
            }
          );
        }
        else if(userDetails == null)
        {
          response.statusCode = 404;
          return response.send(
            {
              status: 'FAILURE',
              message: 'No data found.' 
            }
          );
        }
        else
        {
          userDetails.active = false;
          var date = new Date();
          userDetails.updateTime = date;
          userDetails.save(function(err)
            {
              if(err)
              {

              } 
              else
              {
                response.statusCode = 200;
                return response.send(
                  {
                    status: 'SUCCES',
                    message: 'user  removed.' 
                  }
                );
              }
            }
          );
        }
      }
    );
  }
};


