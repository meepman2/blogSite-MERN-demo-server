const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

let User = require("../collections/user-model");
const saltRounds = 10;

router.route("/").post((req, res) => {
  //const { displayName, email, password } = req.body.userReg;
  const displayName = req.body.userReg.displayName;
  const email = req.body.userReg.email;
  const password = req.body.userReg.password;

  const salt = bcrypt.genSaltSync(saltRounds);
  const hashPassword = bcrypt.hashSync(password, salt);

  const newUser = new User({
    displayName: displayName,
    email: email,
    password: hashPassword,
  });

  newUser
    .save()
    .then(() => res.json("new User added"))
    .catch(error => {
      res.json(error);
    });
});

module.exports = router;
