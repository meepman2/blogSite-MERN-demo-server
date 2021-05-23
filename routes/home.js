const router = require("express").Router();
let Post = require("../collections/post-model");
const jwt = require("jsonwebtoken");
const authenticateToken = require("../middle_ware/auth");

router.route("/").post(authenticateToken, async (req, res) => {
  console.log(req.user);
  await Post.find()
    .then(posts => res.json(posts))
    .catch(err => res.json(err));
});

// router.route("/:id").get(authenticateToken, (req, res) => {
//   Post.findById(req.params.id)
//     .then(post => res.json(post))
//     .catch(err => res.json(err));
// });

// router.route("/:id").delete(authenticateToken, (req, res) => {
//   Post.findByIdAndDelete(req.params.id)
//     .then(post => res.json(post))
//     .catch(err => res.json(err));
// });

router.route("/token").post((req, res) => {
  const token = req.body.token;

  if (token === null) {
    return res.sendStatus(401);
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    res.json({ user: user, token: token });
  });
});

router.route("/logout").post((req, res) => {
  res.send("you have been logged out");
  res.redirect("/");
});

module.exports = router;
