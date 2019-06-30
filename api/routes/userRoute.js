"use strict";
 
/*-------------------models---------------*/

module.exports = function(app, passport)
{
   var addDataController = require('../controllers/userController/addDataController');
  var updateDataController = require('../controllers/userController/updateDataController');
  var deleteDataController = require('../controllers/userController/deleteDataController');
  var requestUserDataController = require('../controllers/userController/requestUserDataController');
  var getDataController = require('../controllers/userController/getDataController');
  var loginDataController = require('../controllers/userController/loginDataController');


 
  /*-------------add login controller--------*/  

  app.route('/user/login')
    .post(loginDataController.login);

  app.route('/user/logout')
    .get(loginDataController.logout);
 
  /*-------------add data controller--------*/  
  app.route('/user/adduser')
     .post(addDataController.addUser);
 
  app.route('/user/addproject')
    .post(addDataController.addProject);

  app.route('/user/addtask')
    .post(addDataController.addTask);

  app.route('/user/addnotification')
    .post(addDataController.addNotification);

  app.route('/user/addcomment')
    .post(addDataController.addComment);  


  /*---------------update data controller---------------*/

  app.route('/user/updateuser')
    .post(updateDataController.updateUser);

  app.route('/user/updatenotification')
    .post(updateDataController.updateNotification);

  app.route('/user/updateproject')
    .post(updateDataController.updateProject);

  /*------------------------Request Data controller------------*/
  
  app.route('/user/acceptorreject')
    .post(requestUserDataController.acceptOrReject);
  
  app.route('/user/requestuser')
    .post(requestUserDataController.requestUser);

  app.route('/user/assigntask')
    .post(requestUserDataController.assignTask);

  app.route('/user/blockuser')
    .post(requestUserDataController.blockUser); 

  app.route('/user/projectusers')
    .get(requestUserDataController.projectUsers);

  app.route('/user/leaveproject')
    .delete(requestUserDataController.leaveproject);

  app.route('/user/usercomment')
    .get(requestUserDataController.userComment);
    
  app.route('/user/getblockusers')
    .get(requestUserDataController.getBlockUsers);

  /*-------------------------get Data Controller-------------*/

  app.route('/user/getuserlist')
    .get(getDataController.getUserList);

  app.route('/user/getrequesteduserlist')
    .get(getDataController.getRequestedUserList);
 
  app.route('/user/getprojectlist')
    .get(getDataController.getProjectList);

  app.route('/user/gettasklist')
    .get(getDataController.getTaskList);

  app.route('/user/getnotificationlist')
    .get(getDataController.getNotificationList);
 
  app.route('/user/userinfo')
    .get(getDataController.userInfo);

  app.route('/user/usertaskinfo')
    .get(getDataController.userTaskInfo);

  /*-------------------delete data controller-----------------*/

  app.route('/user/deleteuser')
    .delete(deleteDataController.deleteUser);

  app.route('/user/unblockuser')
    .delete(deleteDataController.unblockUser);

 /*--------------- get project details----*/

app.route('/user/getProjectData')
    .post(getDataController.getProjectData);

 
}
