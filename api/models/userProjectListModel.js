var mangoose = require("mongoose");
var Schema = mongoose.Schema;

var userProjectSchema = new Schema({
  active:{
    type: Boolean,
    default: true
  },
  createTime: {
    type: Date,
    require: true
  },
  projectId: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
    require: true
  },
  requestedUserId: {
    type: String
  },
  requestedUserStatus: {
    type: String,
    enum: ['ACCEPTED', 'PENDING', 'REJECTED'],
    default: 'PENDING'
  },
  updateTime: {
    type: Date,
    require: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    require: true
  },
  userTaskId: {
    type: Schema.Types.ObjectId,
    ref: 'UserTask',
    require: true
  }

});

var UserProjectList = mongoose.model('UserProjectList', userProjectSchema);
module.exports = {
 UserProjectList: UserProjectList
} 