'use strict';

var Project= require('../../models/projectModel').Project;
var User = require('../../models/userModel').User;
var UserTask = require('../../models/userTaskModel').UserTask;
var Notification = require('../../models/notificationModel').Notification;

exports.adminDashboard = function(request, response){
  async.parallel(
    {
      userCount: function(parallelCallback) 
      {
        User.countDocuments({active: true})
        .lean()
        .exec(function(err, count)
          {
            if(err)
            {
              console.log(err);
              parallelCallback(err, null);
            }
            else
            {
              parallelCallback(null, count);
            } 
          }
        );
      },
         projectCount: function(parallelCallback)
    {
         Project.countDocuments({active: true})
         .lean()
         .exec(function(err, count)
          {
            if(err)
            {
              console.log(err);
              parallelCallback(err, null);
            }
            else if(typeof count == 'undefined') 
            {
              parallelCallback(null, 0);
            }
            else
            {
              parallelCallback(null, count);
            } 
          }
        );
    },
      userTaskCount: function(parallelCallback)
      {
       UserTask.countDocuments({active: true})
        .lean()
        .exec(function(err, count)
          {
            if(err)
            {
              console.log(err);
              parallelCallback(err, null);
            }
            else if(typeof count == 'undefined') 
            {
              parallelCallback(null, 0);
            }
            else
            {
              parallelCallback(null, count);
            } 
          }
        );
      },
      NotificationCount: function(parallelCallback)
      {
        Notification.countDocuments({active: true})
        .lean()
        .exec(function(err, count)
          {
            if(err)
            {
              console.log(err);
              parallelCallback(err, null);
            }
            else if(typeof count == 'undefined') 
            {
              parallelCallback(null, 0);
            }
            else
            {
              parallelCallback(null, count);
            } 
          }
        );
      }
    }, function(err, parallelResult)
    { 
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
        response.statusCode = 200;
        return response.send( 
          {
            status: 'SUCCESS',
            message: 'Dashboard data retrieved.',
            data: {
              dashboardCount: parallelResult
            } 
          }
        );
      }
    }
  );
};    