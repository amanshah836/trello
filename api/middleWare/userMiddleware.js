'use strict';

var User = require('../../api/models/userModel').User;

module.exports = function(request, response, next) {
  /*ignored paths for verfications*/
  if(request.path == '/logout' || request.path == '/login') 
  {
    next();
  }
  else 
  {
    if(typeof request.query.userId == 'undefined' || request.query.userId == null || typeof request.query.authToken == 'undefined') 
    {
      response.statusCode = 400;
      return response.send(
        {
          status: 'FAILURE',
          message: 'userId or authToken not provided'
        }
      );
    } 
    else 
    {
      var userId = mongoose.Types.ObjectId(request.query.userId);
      User
        .findById(userId)
        .exec(function(err, doc)
        {
          if(err) 
          {
            console.log(err);
          }
          else 
          {
            if(doc == null) 
            {
              response.statusCode = 400;  
              return response.send(
                {
                  status: 'FAILURE',
                  message: 'No such userId exist'
                }
              );
            } 
            else 
            {
              /*match users and DB authToken if match procced else throw err.*/
              if(doc.authToken != request.query.authToken) 
              {
                response.statusCode = 400;
                return response.send(
                  {
                    status: 'FAILURE',
                    message: 'authToken verification failed'
                  }
                );
              }
              else
              {
                next();
              }
            }
          }
        }
      );
    }
  }
}
