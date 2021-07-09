const express = require("express");
const { getPosts, createPosts } = require("../controllers/post");
const validator = require("../validators");
const router = express.Router();

router.get("/", getPosts);

//from the front end, we are posting to the back end.  Saving it to the database,
router.post("/post", validator.createPostValidator, createPosts);

module.exports = router;
