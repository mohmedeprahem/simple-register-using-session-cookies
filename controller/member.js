// collection of database
const User = require(`../models/user`);
const Member = require(`../models/member`);

exports.addMember = async (req, res) => {
  let member = {};
  member.userName= req.body.userName,
  member.email= req.body.email
  let result = await Member.findById(req.session.user.member);
  result.member.push(member);
  await result.save();
  res.redirect('/home');
}