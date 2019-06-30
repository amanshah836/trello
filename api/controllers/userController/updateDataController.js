'use strict';

/*----------------------models---------------------------*/

var User = require('../../models/userModel').User;
var Project = require('../../models/projectModel').Project;
var Notification = require('../../models/notificationModel').Notification;


/*--------------------APIs------------------------------*/

exports.updateProject = function(request, response){
  if(typeof request.query.projectId == 'undefined' || request.query.projectId == null)
  {
    response.statusCode = 400;
    return response.send(
    {
      status: 'FAILURE',
      message: 'projectId not provided.'
    });
  }
  else  
  {
    var projectId = mongoose.Types.ObjectId(request.query.projectId);
    Project.findById(projectId)
    .exec(function(err, projectDetails)
    {
      if(err)
      {
        console.log(err);
        response.statusCode = 500;
        return response.send(
          {
            status: 'FALURE',
            message: 'Something went wrong.' 
          }
        ); 
      }
      else
      {
        if(typeof request.query.projectName != 'undefined' || request.query.projectName != null)
        {
          projectDetails.projectName = request.query.projectName;
        }
        var date = new Date();
        projectDetails.updateTime = date;
        projectDetails.save(function(err)
          {
            if(err)
          {
            console.log(err);
            response.statusCode = 500;
            return response.send(
            {
              status: 'FAILURE',
              message: 'Something went wrong'
            });
          }
          else
          {
            response.statusCode = 200;
            return response.send(
            {
              status: 'SUCCES',
              message: 'project updated'
            });
          }
          });
      }

    });
  }
}


exports.updateNotification = function(request, response){
  if(typeof request.query.notificationId == 'undefined' || request.query.notificationId == null){
  response.statusCode = 400;
  return response.send(
    {
      status: 'FAILURE',
      message: 'notificationId not provided.' 
    }
  );
  }
  else
   {
    var notificationId = mongoose.Types.ObjectId(request.query.notificationId);
    Notification.findById(notificationId)
    .exec(function(err, notificationDetails)
      {
      if(err)
      {
        console.log(err);
        response.statusCode = 500;
        return response.send(
          {
            status: 'FALURE',
            message: 'Something went wrong.' 
          }
        );
      }
      else
      {
        if (typeof request.query.notificationBody != 'undefined' || request.query.notificationBody != null)
        {
          notificationDetails.notificationBody = request.query.notificationBody;
        }
         if (typeof request.query.notificationDiscription != 'undefined' || request.query.notificationDiscription != null)
        {
          notificationDetails.notificationDiscription = request.query.notificationDiscription;
        } 
         if (typeof request.query.notificationTitle != 'undefined' || request.query.notificationTitle != null)
        {
          notificationDetails.notificationTitle = request.query.notificationTitle;
        }
        var date = new Date();
        notificationDetails.updateTime = date;
        notificationDetails.save(function(err)
        {
          if(err)
          {
            console.log(err);
            response.statusCode = 500;
            return response.send(
            {
              status: 'FAILURE',
              message: 'Something went wrong'
            });
          }
          else
          {
            response.statusCode = 200;
            return response.send(
            {
              status: 'SUCCES',
              message: 'Notification updated'
            });
          }
        });  
      }
    });
  } 

}


exports.updateUser = function(request, response){
if(typeof request.query.userId == 'undefined' || request.query.userId == null){
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
          status: 'FALURE',
          message: 'Something went wrong.' 
        }
      );
    }
    else
    {
      if(typeof request.query.userContactNo != 'undefined' || request.query.userContactNo != null)
      {
        userDetails.userContactNo = request.query.userContactNo;
      }
      if(typeof request.query.userPassword != 'undefined' || request.query.userPassword != null)
      {
       userDetails.userPassword = request.query.userPassword;
      }
      var date = new Date();
      userDetails.updateTime = date;
      userDetails.save(function(err)
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
              status: 'SUCCES',
              message: 'user updated.'
            }
          );
        }
      });
    }
  });
}
}


