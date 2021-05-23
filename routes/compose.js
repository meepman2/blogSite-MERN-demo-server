const router = require("express").Router();
let Post = require("../collections/post-model");
const authenticateToken = require("../middle_ware/auth");

router.route("/").post(authenticateToken, (req, res) => {
  const Title = req.body.title;
  const Content = req.body.content;

  const newPost = new Post({ title: Title, content: Content });

  newPost
    .save()
    .then(() => {
      res.json("post added");
    })
    .catch(error => {
      res.json(error);
    });
});

module.exports = router;
