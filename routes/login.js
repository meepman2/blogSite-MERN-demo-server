require("dotenv").config();
const router = require("express").Router();
const User = require("../collections/user-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.route("/").post(async (req, res) => {
  const Email = req.body.email;
  const Password = req.body.password;

  await User.findOne({ email: Email })
    .then(user => {
      bcrypt.compare(Password, user.password, (err, result) => {
        if (result) {
          const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET);
          res.json({ user: user, accessToken: accessToken });
        } else {
          res.json({ err });
        }
      });
    })
    .catch(err => res.json(err));
});

module.exports = router;
