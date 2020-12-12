/// requirement modules
const mongoose = require(`mongoose`);
const userSchema = new mongoose.Schema({
  name:String,
  email: String,
  password: String,
  member: {
    type: 'ObjectId', 
    ref: 'member'
  }
});

const User = mongoose.model('user', userSchema);

module.exports = User;