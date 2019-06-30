'use strict';


/*-------------------------------Models----------------*/

var User = require('../../models/userModel').User;
var UserProjectList = require('../../models/userProjectListModel').UserProjectList;
var Project = require('../../models/projectModel').Project;
var UserTask = require('../../models/userTaskModel').UserTask;
var Block = require('../../models/blockUserModel').Block;
var Comment = require('../../models/commentModel').Comment;



/*----------------------------APIs-----------------------*/
exports.getBlockUsers = function(request, response)
{
  if(typeof request.query.userId == 'undefined' || request.query.userId == null)
  {
    request.statusCode = 400;
    return response.send({
      status: 'FAILURE',
      message: 'userId not provided.'
    });
  }
  else
  {
    var userId = mongoose.Types.ObjectId(request.query.userId)
    Block.find({userId: userId, active: true})
    .exec(function(err, blockDoc) 
    {
      if(err)
      {
        console.log(err)
      }
      else
      {
        var blockDetails = [];
        batch(blockDoc).sequential()
        .each(function(i, block, batchCallback)
        {
          if(block == null)
          {
            batchCallback();
          } 
          else
          {
            var temp = {};
            temp.blockId = block._id;
            temp.blockedUser = block.blockedUser
            blockDetails.push(temp);
            batchCallback(); 
          }
        
        } 
        ).end(function(batchResult)
        {
          response.statusCode = 200;
          return response.send(
            {
              status: 'SUCCESS',
              message: 'block users retrived.',
              data: {
                blockList: blockDetails
              }
            }
          );
        });
      }
    });
  }
}

exports.blockUser = function(request, response)
{
  if(typeof request.query.userId == 'undefined' || request.query.userId == null )
  {
    request.statusCode = 400;
    return response.send({
      status: 'FAILURE',
      message: 'userId not provided.'
    });
  }
  else
  {
    User.findOne({userName: request.query.userName, active: true})
    /*.lean()*/
    .exec(function(err, userDetails)
    {
      if(err)
      {
        console.log(err);
        request.statusCode = 500;
        return response.send({
          status: 'FAILURE',
          message: 'Something went wrong.'
        });
      }
      else if(userDetails == null)
      {
        request.statusCode = 404;
        return response.send({
          status: 'FAILURE',
          message: 'userName not found.'
        });
      }
      else
      {
        var blockedUser = mongoose.Types.ObjectId(userDetails._id)
        Block.findOne({blockedUser: blockedUser, active: true})
        .exec(function(err, blockedDetails)
        {
          console.log(blockedDetails)
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
          else if(blockedDetails != null)
          {
            response.statusCode = 300;
            return response.send(
              {
                status: 'FAILURE',
                message: 'user already blocked.' 
              }
            );
          }
          else
          {
            var block = new Block();
            block.blockedUser = blockedUser;
            block.userId = request.query.userId;
            block.save(function(err){
              if(err)
              {
                console.log(err)
              }
              else
              {
                response.statusCode = 201;
                return response.send(
                  {
                    status: 'SUCCESS',
                    message: 'user blocked.' ,
                    /*data: 
                    {
                      blockedUserList: blockedDetails
                    }*/
                  }
                );
              }
            });
          }
        });
      }        
    }); 
  }
}


exports.requestUser = function(request, response){
  if(typeof request.query.projectId == 'undefined' || request.query.projectId == null)
  {
    response.statusCode = 400;
    return response.send(
      {
        status: 'FAILURE',
        message: 'projectId not provided.' 
      }
    );
  }
  else
  {
    User.findOne({userName: request.query.userName, active: true})
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
      else if(userDetails == null)
      {
        response.statusCode = 409;
          return response.send(
            {
              status: 'FAILURE',
              message: 'userName not valid.' 
            }
          );
      }
      else if(userDetails != null)
      { 
        const requestedUserId = mongoose.Types.ObjectId(userDetails._id)
        UserProjectList.findOne({requestedUserId: requestedUserId, active: true})
        .exec(function(err, requestUserDetails){
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
          else if(requestUserDetails != null)
          {
            if(requestUserDetails.requestedUserStatus == 'PENDING')
            {
              response.statusCode = 409;
              return response.send(
              {
                status: 'FAILURE',
                message: 'user already sent request.'
              });
            }
            else if (requestUserDetails.requestedUserStatus == 'ACCEPTED')
            {
              response.statusCode = 200;
              return response.send(
              {
                status: 'SUCCESS',
                message: 'USER IS ALREADY ADDED TO Project .' 
              });
            }
            else 
            {
              response.statusCode = 500;
              return response.send({
                status: 'FAILURE',
                message: 'User have rejected your request'
              });
            }
          }
          else
          {
            var userProjectList = new UserProjectList();
            userProjectList.requestedUserId = requestedUserId;
            userProjectList.projectId = request.query.projectId;
            /*var projectId = mongoose.Types.ObjectId(projectId)
            Project.findById(projectId)
            userProjectList.projectId = projectId;*/
            userProjectList.save(function(err)
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
                    message: 'user sent request.' 
                  }
                );
              }
            });
          }
        });
      }
    });
  }
}


exports.acceptOrReject = function(request, response){
  if(typeof request.query.projectId == 'undefined' || request.query.projectId == null ||     
    /*typeof request.query.userId == 'undefined' || request.query.userId == null ||*/
    typeof request.query.userProjectListId == 'undefined' || request.query.userProjectListId == null ||
    typeof request.query.requestedUserStatus == 'undefined' || request.query.requestedUserStatus == null)
  {
    response.statusCode = 400;
    return response.send({
      status: 'FAILURE',
      message: 'userProjectListId, projectId, requestedUserStatus not provided'
    });
  }
  else
  {
    var userProjectListId = mongoose.Types.ObjectId(request.query.userProjectListId)
    UserProjectList.findById(userProjectListId)
    .exec(function(err, requestUserDetails){
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
      else if(requestUserDetails.requestedUserStatus == 'PENDING')
      {       
        requestUserDetails.requestedUserStatus = request.query.requestedUserStatus;
        var date = new Date();
        requestUserDetails.updateTime = date;
        requestUserDetails.save(function(err)
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
            return response.send({
              status: 'SUCCESS',
              message: 'request updated'
            });
          }
        });    
      }  
      else
      {
        response.statusCode = 404;
        return response.send({
          status: 'FAILURE',
          message: 'REQUEST ALREADY UPDATED'
        });
      }
    });
  }
}


exports.assignTask = function(request, response)
{
  if(typeof request.query.projectId == 'undefined' || request.query.projectId == null ||
     typeof request.query.userId == 'undefined' || request.query.userId == null ||
     typeof request.query.taskId == 'undefined' || request.query.taskId == null)
  {
    request.statusCode = 400;
    return response.send ({
      status: 'SUCCESS',
      message: 'projectId userName, taskId not Provided'
    });
  }  
  else
  {
    var userId = mongoose.Types.ObjectId(request.query.assignUserId)
    UserProjectList.findOne({requestedUserId: userId, projectId: request.query.projectId})
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
       var taskId = mongoose.Types.ObjectId(request.query.taskId)
       UserTask.findById(taskId)
      .exec(function(err, assignUsersDoc)
        {
          /*console.log(assignUsersDoc);*/
          if(err)
          {
            console.log(err);
          }
          else
          {
            assignUsersDoc.assignUserId = request.query.assignUserId;
            assignUsersDoc.save(function(err)
            {
              if(err)
              {
                console.log(err)
              }
              else
              {
                response.statusCode = 200;
                return response.send(
                  {
                    status: 'SUCCESS',
                    message: 'user Been assigned task.',
                    data: {
                      userTask: assignUsersDoc
                    }
                  }
                );
              }
            });
          }
        });
      } 
   });
  }
}

                        
exports.userComment = function(request, response)
{
  if(typeof request.query.taskId == 'undefined' || request.query.taskId == null)
  {
    request.statusCode = 400;
    return response.send ({
      status: 'FAILURE',
      message: 'taskId not provided.'
    });
  }
  else
  {
    var taskId = mongoose.Types.ObjectId(request.query.taskId)
    Comment.find({taskId: taskId, active: true})
    .exec(function(err, taskDoc)
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
        var taskCommentDetails = [];
        batch(taskDoc).sequential()
        .each(function(i, comment, batchCallback)
        {
          if(comment == null)
          {
            batchCallback();
          } 
          else
          {
            var temp = {};
            temp.commentId = comment._id;
            temp.addComment = comment.addComment;
            temp.createTime = comment.createTime;
            taskCommentDetails.push(temp);
            batchCallback(); 
          }
        
        } 
        ).end(function(batchResult)
        {
          response.statusCode = 200;
          return response.send(
            {
              status: 'SUCCESS',
              message: 'task comment retrived.',
              data: {
                commentList: taskCommentDetails
              }
            }
          );
        });
      }
    }); 
  }
}


exports.projectUsers = function(request, response)
{
  if(typeof request.query.projectId == 'undefined' || request.query.projectId == null)
  {
    request.statusCode = 400;
    return response.send ({
      status: 'FAILURE',
      message: 'projectId not provided.'
    });
  }
  else
  {
    var projectId = mongoose.Types.ObjectId(request.query.projectId)
    UserProjectList.find({projectId: projectId, requestedUserStatus: "ACCEPTED", active:true})
    .exec(function(err, requestedUserDoc){
      /*console.log(JSON.stringify(requestedUserDoc));*/
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
        var requestUserDetails = [];
        batch(requestedUserDoc).sequential()
        .each(function(i, userProjectList, batchCallback)
          {
            if(userProjectList == null)
            {
              batchCallback();
            }
            else
            {
              var temp = {};
              temp.userProjectListId = userProjectList._id;
              temp.requestedUserStatus = userProjectList.requestedUserStatus;             
              var userId = mongoose.Types.ObjectId(userProjectList.requestedUserId)
              User.findOne({_id: userId})
              .exec(function(err, userDetails)
              {
                if(err){
                  console.log(err)
                }
                else if(userDetails == null)
                {
                  batchCallback();
                }
                else
                {
                  temp.userName = userDetails.userName;
                  requestUserDetails.push(temp);
                  batchCallback(); 
                }
              });
            }
          }
        ).end(function(batchResult)
          {
            response.statusCode = 200;
            return response.send(
              {
                status: 'SUCCESS',
                message: 'users in project retrived.',
                data: {
                  requestedUserList: requestUserDetails
                }
              }
            );/*callback(null, requestUserDetails);*/
          }
        );  
        }
      }
    );
  }
}  

/*---------------------leave project--------------------------------*/


exports.leaveproject = function(request, response)
{
  if(typeof request.query.projectId == 'undefined' || request.query.projectId == null)
  {
    response.statusCode = 400;
    return response.send(
    {
      status: "FAILURE",
      message: 'projectId not provided'
    });
  }  

  else
  {
    var userId = mongoose.Types.ObjectId(request.query.userId)
    UserProjectList.findOne({requestedUserId: userId, active: true})
    
    .exec(function(err, userDoc)
    {
      console.log(userDoc)
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
        userDoc.active = false;
        var date = new Date();
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
                message: 'user removed.' 
              }
            );
          }
        });
      }
    });
  }
} 
