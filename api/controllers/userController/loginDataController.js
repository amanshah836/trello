"use strict";

/*---------------------Models-------------------------*/

var User = require('../../models/userModel').User;


/*----------------------Login APIs-------------*/

exports.login = function (request, response)
{
  if(typeof request.query.emailId == 'undefined' || request.query.emailId == null ||
    typeof request.query.password == 'undefined' || request.query.password == null)
  {
    response.statusCode = 400;
    return response.send(
    {
      status: 'FAILURE',
      message: 'emailId or password not provided.'
    });
  }
  else
  {
   User.findOne({emailId: request.query.emailId,password:request.query.password , active: true})
   .exec(function(err, userDoc)
    {
      if(err)
      {
        response.statusCode = 500;
        return response.send(
        {
          status: 'FAILURE',
          message: 'something went wrong.'
        });
      }
      else if(userDoc == null)
      {
        response.statusCode = 404;
        return response.send(
        {
          status: 'FAILURE',
          message: 'emailId or Password dose notexist.'
        });
      }
      else
      {
        var date = new Date();
        userDoc.authToken = randomstring.generate(5); 
        userDoc.emailId = request.query.emailId;
        userDoc.password = request.query.password;
        userDoc.updateTime = date;
        userDoc.save(function(err, userDetails)
        {
          if (err) 
          {
            response.statusCode = 500;
            return response.send(
            {
              status: 'FAILURE',
              message: 'something went wrong.'
            });
          }
          else
          {
            var userResult = {};
            userResult.userId = userDetails._id;
            userResult.emailId = userDetails.emailId;
            userResult.userName = userDetails.userName;
            userResult.authToken = userDetails.authToken;
            response.statusCode = 200;
            return response.send(
            {
              status: 'SUCCESS',
              message: 'user exist.',
              data:
              {
                userList : userResult
              }
            });
          }
        });      
      }
    });
  }
}


exports.logout = function(request, response) {
  var userId = mongoose.Types.ObjectId(request.query.userId)
  User.findById(userId)
  .exec(function(err, userDoc)
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
      else
      {
        var date = new Date();
        userDoc.authToken = null;
        userDoc.updateTime = date;
        userDoc.save(function(err)
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
            else
            {
              response.statusCode = 200;
              return response.send(
                {
                  status: 'SUCCESS',
                  message: 'User logged out.'
                }
              );
            }
          }
        );
      }
    }
  );
};
