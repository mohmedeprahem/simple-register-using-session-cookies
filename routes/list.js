/// requirement modules
const express = require(`express`);
const router = express.Router();

// maddleware of controller
const userController = require(`../controller/user`);
const memberController = require(`../controller/member`);

// @disc: view home page
// @route: GAT '/home'
// @access: privet
router.get(`/home`, userController.viewHome);

// @disc: add new members
// @route: POST '/home/add'
// @access: privet
router.post(`/home/add`, memberController.addMember);

module.exports = router;