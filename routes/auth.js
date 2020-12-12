/// requirement modules
const express = require(`express`);
const router = express.Router();

// maddleware of controller
const controller = require(`../controller/user`);

// @disc: view login page
// @route: GAT '/'
// @access: public
router.get(`/`, controller.viewLogin);

// @disc: view home page
// @route: POST '/home'
// @access: privat
router.post('/home', controller.postLogin);

// @disc: view sign up page
// @route: GET '/signup'
// @access: public
router.get('/signup', controller.viewSignUp)



// @disc: sign up and view home page
// @route: POST '/signup'
// @access: privet
router.post('/signup', controller.postSignUp)

// @disc: logout and return to login page
// @route: GET '/logout'
// @access: public
router.post(`/logout`, controller.logout)


module.exports = router;