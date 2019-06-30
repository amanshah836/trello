var mangoose = require('mongoose');
var Schema = mongoose.Schema;

var notificationSchema = new Schema({
  active:{
    type: Boolean,
    default: true
  },
  notificationBody: {
    type: String,
    require: true
  },
  notificationDiscription: {
    type : String,
    require: true
  },
  notificationTitle: {
    type: String,
    require: true
  },
  projectId: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
    require: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    require: true
  }
});

var Notification = mongoose.model('Notification', notificationSchema);
module.exports = {
 Notification: Notification
} 
