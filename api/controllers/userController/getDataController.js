'use strict';

/*---------------------module--------------------*/

var User = require('../../models/userModel').User;
var UserProjectList = require('../../models/userProjectListModel').UserProjectList;
var Project = require('../../models/projectModel').Project;
var UserTask = require('../../models/userTaskModel').UserTask;
var Notification = require('../../models/notificationModel').Notification;


/*----------------------Apis----------------------*/

exports.userTaskInfo = function(request,response){
 var userTaskId = mongoose.Types.ObjectId(request.query.userTaskId);
  UserTask.findById(userTaskId)
  .exec(function(err, userTaskDetails)
    {
      if(err)
      {
        console.log(err);
        response.statusCode = 500;
        return response.send(
          {
            status: 'FAILURE',
            message: 'Internal server error.'
          }
        );
      }
      else 
      {
        response.statusCode = 200;
        return response.send(
          {
            status: 'SUCCESS',
            message: "userTaskInfo is retrived",
            data: {
              userTaskInfo: userTaskDetails
            }
          }
        );
      }
    }
  );
}



exports.userInfo = function(request,response){
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
            message: 'Internal server error.'
          }
        );
      }
      else 
      {
        response.statusCode = 200;
        return response.send(
          {
            status: 'SUCCESS',
            message: "userInfo is retrived",
            data: {
              userInfo: userDetails
            }
          }
        );
      }
    }
  );
}

exports.getTaskList = function(request, response){
  UserTask.find({active:true})
  .exec(function(err, taskDoc){
    if(err)
    {
      console.log(err);
      response.statusCode = 500;
      return response.send(
        {
          status: 'FAILURE',
          message: 'Internal server error.'
        }
      );
    }
    else if(taskDoc.length == 0)
      {
        response.statusCode = 200;
        return response.send(
          {
            status: 'SUCCESS',
            message: 'taskDoc retrive.',
            data: {
              taskList: taskDoc
            }
          }
        );
      }
      else
      {
        response.statusCode = 200;
        return response.send(
          {
            status: 'SUCCESS',
            message: 'taskDoc retrive.',
            data: {
              taskList: taskDoc
            }
          }
        );
      }
  });
}

exports.getNotificationList = function(request, response){
  Notification.find({active:true})
  .exec(function(err, notificationDoc){
    if(err)
    {
      console.log(err);
      response.statusCode = 500;
      return response.send(
        {
          status: 'FAILURE',
          message: 'Internal server error.'
        }
      );
    }
    else if(notificationDoc.length == 0)
      {
        response.statusCode = 200;
        return response.send(
          {
            status: 'SUCCESS',
            message: 'notificationDoc retrive.',
            data: {
              notificationList: notificationDoc
            }
          }
        );
      }
      else
      {
        response.statusCode = 200;
        return response.send(
          {
            status: 'SUCCESS',
            message: 'notificationDoc retrive.',
            data: {
              notificationList: notificationDoc
            }
          }
        );
      }
  });
}

exports.getProjectList = function(request, response){
  Project.find({active:true})
  .exec(function(err, getProjectDoc){
    if(err)
    {
      console.log(err);
      response.statusCode = 500;
      return response.send(
        {
          status: 'FAILURE',
          message: 'Internal server error.'
        }
      );
    }
    else if(getProjectDoc.length == 0)
      {
        response.statusCode = 200;
        return response.send(
          {
            status: 'SUCCESS',
            message: 'getProjectDoc retrive.',
            data: {
              projectList: getProjectDoc
            }
          }
        );
      }
      else
      {
        response.statusCode = 200;
        return response.send(
          {
            status: 'SUCCESS',
            message: 'requestedUser retrive.',
            data: {
              getProjectList: getProjectDoc
            }
          }
        );
      }
  });
}


exports.getRequestedUserList = function(request, response){
  UserProjectList.find({active:true})
  .exec(function(err, requestedUserDoc){
    if(err)
    {
      console.log(err);
      response.statusCode = 500;
      return response.send(
        {
          status: 'FAILURE',
          message: 'Internal server error.'
        }
      );
    }
    else if(requestedUserDoc.length == 0)
      {
        response.statusCode = 200;
        return response.send(
          {
            status: 'SUCCESS',
            message: 'requestedUser retrive.',
            data: {
              userList: requestedUserDoc
            }
          }
        );
      }
      else
      {
        response.statusCode = 200;
        return response.send(
          {
            status: 'SUCCESS',
            message: 'requestedUser retrive.',
            data: {
              requestedUsesList: requestedUserDoc
            }
          }
        );
      }
  });
}

exports.getUserList = function(request, response){
  User.find({active:true})
  .exec(function(err, userDoc) 
    {
      if(err)
      {
        console.log(err);
        response.statusCode = 500;
        return response.send(
          {
            status: 'FAILURE',
            message: 'Internal server error.'
          }
        );
      }
      else if(userDoc.length == 0)
      {
        response.statusCode = 200;
        return response.send(
          {
            status: 'SUCCESS',
            message: 'getUsersList retrive.',
            data: {
              userList: userDoc
            }
          }
        );
      }
      else
      {
        response.statusCode = 200;
        return response.send(
          {
            status: 'SUCCESS',
            message: 'getUsersList retrive.',
            data: {
              userList: userDoc
            }
          }
        );
      }
    }
  );
}

/*--------------- get   project id& name from userid---------------------*/

exports.getProjectData = function(request,response){
  if(typeof request.query.userId == 'undefined' || request.query.userId == null)
	{
		response.statusCode = 400;
		return response.send(
		{
			status: 'FAILURE',
            message: 'userId  not provided.' 
		});
	}
	else
	{
		var userId = mongoose.Types.ObjectId(request.query.userId);
		Project.find({userId :userId,active:true})
		.exec(function(err, userDoc)
			{
				console.log(userDoc)
			    if(err)
		        {
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
		          	var userDetails = [];
		          	batch(userDoc).sequential()
		          	.each(function(i,Project,batchCallBack)
		          	{
		          	  if(Project== null)
		          		{
		          			batchCallBack();
		          		}
		          		else
		          		{
		          		  var temp = {};
		    
		          		  temp.projectName = userDoc.projectName;
		          		  userDetails.push(temp);
		          		  batchCallBack();
		          		}
		          	}
		          	).end(function(batchResult)
		          	{
		          	  response.statusCode = 200;
		              return response.send(
		               {
		                   status: 'SUCCESS',
		                   message: 'UserProjectList retrive.',
		                   data: {
		                   UserProjectList: userDoc
		                    }
		               });
		            }); 
			      }
		    });
	}	
}	
		
