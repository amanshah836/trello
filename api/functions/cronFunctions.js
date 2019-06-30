'use strict'

var UserTask = require('../../models/userTaskModel').UserTask;

var expireTask = new CronJob('* * * * *',function()
{
	Task.find({'active': true})
	.exec(function(err, userTaskDetails)
	  {
		if(err)
		{
			console.log(err);
		}
		else if(userTaskDetails.length == 0)
		{
			console.log('Cron completed');
		}
		else
		{
		  batch(userTaskDetails).parallel()
		  .each(function(i, task, callback)
			{
			  var currentTime = new Date();
			  var expireTime = task.taskExpire;
			  var status = Math.floor(expireTime - currentTime.getTime());
			  if (status <= 0)
			  {
			  	task.active = false;
			  	task.save(function(err, result)
			  	  {
			  		if(err)
			  		{
			  			console(err)
			  		}
			  		else
			  		{
			  			callback();
			  		}
			  	  }
			  	);  
			  }
			  else
			  {
			  	callback();
			  }
			}
		}.end(function(result){

		}):		
		
	  }
	);  
}
expireTask.start();

sendMessage = function(userTaskId, usertaskStatus) {  
  var msg91 = require("msg91")(deadliner.msgAuthKey, deadliner.sendersId, deadliner.routeNo);
  var userTaskId = mongoose.Types.ObjectId(request.query.userTaskId);
  UserTask.findById(userTaskId)
    .lean()
    .exec(function(err, userTaskDoc)
      {
        if(err)
        {
          console.log(err);
        } 
        else if(userTaskDoc == null)
        {
          console.log('task null')
        }
        else
        {
          var message = null;
          User.findById(userTaskDoc.userId)
          .lean()
          .exec(function(err, userDoc)
            {
              if(err)
              {
                console.log(err);
              } 
              else if(userDoc == null)
              {
                console.log('user null');
              }
              else if(usertaskStatus == 'ACCEPTED')
              {
                message = 'Your task request has been accepted ' + moment(userTaskDoc.createTime).utcOffset("+05:30").format('LL') + '.';
              }
              else if(usertaskStatus == 'REJECTED')
              {
                message = 'Your task request has been rejected ' + moment(userTaskDoc.createTime).utcOffset("+05:30").format('LL') + '.';
              }
              else if(usertaskStatus == 'COMPLETED')
              {
                message = 'Your task has been completed ' + moment(userTaskDoc.updateTime).utcOffset("+05:30").format('LL') + '.';
              }
              msg91.send(userTaskDoc.phoneNumber, message, function(err, res)
                {
                  if(err)
                  {
                    console.log(err);
                  }
                }
              );
            }
          );
        }
      }
    );

}