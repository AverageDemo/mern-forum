const express = require("express");
const passport = require("passport");
const router = express.Router();

const Usergroup = require("../../models/Usergroup");

/*
 * @route   POST api/admin/createUsergroup
 * @desc    Create a new usergroup
 * @access  Private
 */
// This is for testing!
router.post("/createUsergroup", passport.authenticate("jwt", { session: false }), (req, res) => {
    const newUsergroup = new Usergroup({
        name: "Admin",
        permissions: {
            isAdmin: true
        }
    });

    newUsergroup.save();

    res.json(newUsergroup);
});

module.exports = router;
