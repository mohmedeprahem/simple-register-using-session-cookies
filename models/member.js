/// requirement modules
const mongoose = require(`mongoose`);
const memberSchema = new mongoose.Schema({
  nameAdmin: String,
  member: [{
    userName:String,
    email:String
  }]
});

const Member = mongoose.model('member',memberSchema);

module.exports = Member;