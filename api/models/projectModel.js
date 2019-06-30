var mangoose = require("mongoose");
var Schema = mongoose.Schema;

var projectSchema = new Schema({
  active: {
    type: Boolean,
    default: true
  },
  projectName: {
    type: String
  },
  createTime: {
    type: Date,
    require: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    type: String
  },
  updateTime: {
    type: Date,
    require: true
  }
});

var Project = mongoose.model("Project", projectSchema);
module.exports ={
Project : Project
}