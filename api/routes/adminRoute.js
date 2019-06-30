"use strict";

module.exports = function(app, passport)
{
	var adminDashboardController = require('../controllers/adminControllers/adminDashboardController');	
  var adminLoginController = require('../controllers/adminControllers/adminLoginController');




  /*---------------------------------------ADMIN LOGIN CONTROLLER ROUTES-----------------------------------------------------*/  

  app.route('/admin/login')
    .post(passport.authenticate('local-login', {
      successRedirect: '/admin/dashboard',
      failureRedirect: '/admin/login/failure'
    }));

  app.route('/admin/login/failure')
    .get(adminLoginController.failure);

  app.route('/admin/logout')
    .get(isLoggedIn, adminLoginController.logout);

  app.route('/admin/adminentry')
    .post(adminLoginController.adminEntry);


/*-----------dashboard controller-----*/


/*app.route('/admin/dashboard')
    .get(adminDashboardController.adminDashboard);*/


 app.route('/admin/dashboard')
    .get(isLoggedIn, adminDashboardController.adminDashboard);


}

function isLoggedIn(request, response, next) {
  if (request.isAuthenticated()) 
  {
    return next();
  }
  response.statusCode = 400;
  return response.send(
    {
      status: 'FAILURE',
      message: 'User not logged in'
    }
  );
}
