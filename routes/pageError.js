/// requirement modules
const express = require(`express`);
const router = express.Router();

// maddleware of controller
const controller = require(`../controller/error`);


// @disc: page not found
// @route: GAT '*'
// @access: public
router.get(`*`, controller.err)

module.exports = router;