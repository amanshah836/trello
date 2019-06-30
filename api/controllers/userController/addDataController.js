'use strict';


/*------------------models---------------------------*/

var User = require('../../models/userModel').User;
var Project = require('../../models/projectModel').Project;
var UserTask = require('../../models/userTaskModel').UserTask;
var Notification = require('../../models/notificationModel').Notification;
var UserProjectList = require('../../models/userProjectListModel').UserProjectList;
var Comment = require('../../models/commentModel').Comment;

/*-----------------------------------APIS-------------------------------------*/

exports.addNotification = function(request, response){
  if (typeof request.query.notificationBody == 'undefined' || request.query.notificationBody == null ||
    typeof request.query.notificationDiscription == 'undefined' || request.query.notificationDiscription == null ||
    typeof request.query.notificationTitle == 'undefined' || request.query.notificationTitle == null)
  {
    response.statusCode = 400;
    return response.send ({
      status: "FAILURE",
      message: 'notificationBody, notificationDiscription, notificationTitle not provided'
    });
  }
  else
  {
    var notification = new Notification();
    notification.notificationBody = request.query.notificationBody ;
    notification.notificationDiscription =request.query.notificationDiscription;
    notification.notificationTitle = request.query.notificationTitle ;
    notification.save(function(err, notificationDetails)
    {
      if(err)
      {
        console.log(err);
        response.statusCode =  500;
        return response.send(
          {
            status: 'FAILURE',
            message: 'Something went wrong.' 
          }
        );
      }
      else
      {
        response.statusCode = 201;
        return response.send(
        {
          status: 'SUCCESS',
          message: 'notification  created '
        })
      }
    }); 
  }
}



exports.addTask = function(request, response){
  if (typeof request.query.taskName == 'undefined' || request.query.taskName == null ||
    typeof request.query.taskValidity == 'undefined' || request.query.taskValidity == null ||
    typeof request.query.projectId == 'undefined' || request.query.projectId == null)
  {
    response.statusCode = 400;
    return response.send ({
      status: "FAILURE",
      message: 'taskName, taskDeadline, taskValidity not provided'
    });
  }
  else
  {
    var task = new UserTask();
    task.taskName = request.query.taskName ;
    task.taskValidity = parseInt(request.query.taskValidity);
    task.projectId = request.query.projectId;
    var date = new Date();
    task.taskDeadline = date.setDate(date.getDate() + parseInt(request.query.taskValidity));

    task.save(function(err, taskDetails)
    {
      if(err)
      {
        console.log(err);
        response.statusCode =  500;
        return response.send(
          {
            status: 'FAILURE',
            message: 'Something went wrong.' 
          }
        );
      }
      else
      {
        response.statusCode = 201;
        /*console.log(taskDetails);*/
        return response.send(
        {
          status: 'SUCCESS',
          message: 'task created '
        })
      }
    }); 
  }
}


exports.addProject = function(request, response){
  if(typeof request.query.projectName == 'undefined' || request.query.projectName == null ||
    typeof request.query.userId == 'undefined' || request.query.userId == null)
  {
    response.statusCode = 400;
    return response.send ({
      status: "FAILURE",
      message: 'projectName, userId not provided'
    });
  }
  else 
  {
    var project = new Project();
    project.projectName = request.query.projectName;
    project.userId = request.query.userId;
    project.save(function(err, projectDetails)
    {
      if(err)
      {
        console.log(err);
        response.statusCode =  500;
        return response.send(
          {
            status: 'FAILURE',
            message: 'Something swent wrong.' 
          }
        );
      }
      else
      {
        response.statusCode = 201;
        return response.send(
        {
          status: 'SUCCESS',
          message: 'project created '
        })
      }
    });
  }
}



exports.addUser = function(request, response){
  if(typeof request.query.userName == 'undefined' || request.query.userName == null ||
    typeof request.query.emailId == 'undefined' || request.query.emailId == null ||
    typeof request.query.password == 'undefined' || request.query.password == null ||
    typeof request.query.userContactNo == 'undefined' || request.query.userContactNo == null )  
  {
    response.statusCode = 400;
    return response.send ({
      status: "FAILURE",
      message: 'username ,emaiId, password, userContactNo not provided'
    }); 
  }
  else
  {
    var user = new User();
   /*User.findOne({userName: request.query.userName, active:true})*/
   User.findOne({emailId: request.query.emailId, active:true})
    .lean()
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
      else if(userDetails != null)
        {
          response.statusCode = 300;
          return response.send(
            {
              status: 'FAILURE',
              message: 'emailId already exists' 
            }
          );
        }
      else
      {
        user.userName = request.query.userName + randomstring.generate(5) ;
        user.emailId = request.query.emailId;
        user.password = request.query.password;
        user.userContactNo = request.query.userContactNo;
        user.save(function(err)
        {
          if(err)
          {
            console.log(err);
            response.statusCode =  500;
            return response.send(
              {
                status: 'FAILURE',
                message: 'Something swent wrong.' 
              }
            );
          }
          else
          {
            response.statusCode = 201;
            return response.send(
              {
                status: 'SUCCESS',
                message: 'user data added.' 
              }
            );
          }
        });
      }
    });
  }
};


exports.addComment = function(request, response)
{
  if(typeof request.query.userId == 'undefined' || request.query.userId == null ||
     typeof request.query.taskId == 'undefined' || request.query.taskId == null ||
     typeof request.query.addComment == 'undefined' || request.query.addComment == null)
  {
    response.statusCode = 400;
    return response.send ({
      status: "FAILURE",
      message: 'userId, taskId not provided'
    });
  }
  else
  {
    var comment =  new Comment();
    comment.addComment = request.query.addComment;
    comment.taskId = request.query.taskId;
    comment.userId = request.query.userId;
    var date = new Date();
    comment.createTime  = date;
    comment.save(function(err, commentDoc)
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
        response.statusCode = 201 ;
        return response.send(
          {
            status: 'SUCCESS',
            message: 'user data added.' ,
            data:{
              commentList: commentDoc
            }
          }
        );
      }
    });
  }
}  





    



  

 