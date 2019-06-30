var Project = require('../../models/projectModel').Project;
var User = require('../../models/userModel').User;
var Notification = require('../../models/notificationModel').Notification;
var UserTask = require('../../models/notificationModel').UserTask;


/*------------User log out----------*/


exports.logout = function(request, response) {
  request.logout();
  response.statusCode = 200;
  return response.send(
    {
      status: 'SUCCESS',
      message: 'Admin logged out successfully.'
    }
  );
};

/*-------------Login failure-----------*/



exports.failure = function(request, response) {
  response.statusCode = 400;
  return response.send(
    {
      status: 'FAILURE',
      message: 'Email-id or password is incorrect.'
    }
  );
};

/*-------------Admin entry-------------*/


exports.adminEntry = function(request, response) {
  var user = new User();
  user.emailId = 'admin@amanshah.com';
  user.password = '123';
  user.userType = 'ADMIN';
  user.ContactNo = '0000000000';
  user.save(function(err) 
    {
      if(err) 
      {
      console.log(err);
      }
    }
  );
};


