var mangoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
  active:{
    type: Boolean,
    default: true
  },
  authToken: {
    type: String
  },
  createTime: {
    type: Date,
    require: true
  },
  emailId: {
    type: String
  }, 
  password: {
    type: String
  },
  passwordSessionId: {
    type: String,
    default: null
  },
  updateTime: {
    type: Date,
    require: true
  },
  userName: {
    type: String
  },
  userContactNo: {
    type: String
  }

});

/*generating a hash*/
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

/*checking if password is valid*/
userSchema.methods.validPassword = function(password) {
    if(this.password == password) {
      return true;
    }
    else {

      return false;
    }
};

var User = mongoose.model("User", userSchema);
module.exports ={
User : User
}