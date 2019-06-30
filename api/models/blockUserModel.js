var mangoose = require("mongoose");
var Schema = mongoose.Schema;

var blockSchema = new Schema({
  active:{
    type: Boolean,
    default: true
  },
  blockedUser: {
    type: String
  },
  blockId: {
    type: Schema.Types.ObjectId,
    ref: 'Block', 
    require: true
  },
  createTime: {
    type: Date,
    require: true
  },
  updateTime: {
    type: Date,
    require: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User', 
    require: true
  }

});

var Block = mongoose.model("Block", blockSchema);
module.exports ={
Block : Block
}