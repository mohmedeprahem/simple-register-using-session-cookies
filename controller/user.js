// collection of database
const User = require(`../models/user`);
const Member = require(`../models/member`);

// @disc: view login page
// @route: GAT '/'
// @access: public
exports.viewLogin = (req, res) => {
  if(req.session.user){
    return res.redirect(`/home`);
  }
  res.render(`login`, {
    error: req.session.error
  });
}

// @disc: view home page and login
// @route: POST '/home'
// @access: privat
exports.postLogin = async (req, res) => {
  let result = await User.findOne({email:req.body.email,password:req.body.password}).populate(`member`).select(`member`);
  if(result=== null){
    req.session.error = true;
    return res.redirect(`/`)
  }
  req.session.user = result
  res.redirect(`/home`);
}

// @disc: view sign up page
// @route: GET '/home'
// @access: privat
exports.viewSignUp = (req, res) => {
  if(req.session.user){
    return res.redirect(`/home`);
  }
  res.render('signup',{
    emailUsed: false
  })
}

// @disc: sign up and view home page
// @route: POST '/signup'
// @access: privet
exports.postSignUp = async (req, res) => {
  try{
    // check if accout is already used
    let result = await User.findOne({email:req.body.email}).select(`email`);
    if(result !== null&& req.body.email === result.email){
      return res.render('signup',{
        emailUsed: true
      });
    }
    // add data to colection members
    // its use to made documention privat to new user
    let member = new Member();
    member.nameAdmin = req.body.name;
    result = await member.save();
  
    // add data to colection users
    let user = new User()
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;
    user.member = result._id
    result = await user.save();
  
    // save data's user in session
    req.session.user = result;
    res.redirect(`/home`)

  }catch(err){
    console.log(`error:`,err)
  }
  
}

// @disc: view home page
// @route: GET '/home'
// @access: privat
exports.viewHome = async (req, res) => {
  if(!req.session.user){
    return res.redirect(`/`);
  }
  let users = await User.findOne({_id:req.session.user._id}).populate('member').select('memeber');
  res.render('home',{
    user: users 
  });  
}

// @disc: logout and return to login page
// @route: POST '/logout'
// @access: public
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    console.log(err)
    res.redirect(`/`);
  })
}
