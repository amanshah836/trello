var mangoose = require("mongoose");
var Schema = mongoose.Schema;

var commentSchema = new Schema({
  active:{
    type: Boolean,
    default: true
  },
  addComment: {
    type:String
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
   taskId: {
    type: Schema.Types.ObjectId,
    ref: 'UserTask', 
    require: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'USER', 
    require: true
  },
  updateTime: {
    type: Date,
    require: true
  }

});

var Comment = mongoose.model("Comment", commentSchema);
module.exports ={
Comment : Comment
}