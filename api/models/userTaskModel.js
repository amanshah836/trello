var mangoose = require("mongoose");
var Schema = mongoose.Schema;

var userTaskSchema = new Schema({
  active:{
    type: Boolean,
    default: true
  },
  assignUserId: {
    type: Schema.Types.ObjectId,
    ref: 'User', 
    require: true
  },
  createTime: {
    type: Date,
    require: true
  },
  commentId: {
    type: Schema.Types.ObjectId,
    ref: 'Comment',
    require: true
  },
  projectId: {
    type: Schema.Types.ObjectId,
    ref: 'Project', 
    require: true
  },
  taskName: {
    type: String
  },
  updateTime: {
    type: Date,
    require: true
  }
});

var UserTask = mongoose.model("UserTask", userTaskSchema);
module.exports ={
UserTask : UserTask
}