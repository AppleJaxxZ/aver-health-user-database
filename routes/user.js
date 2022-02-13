const express = require("express");
const { getUser, createUser } = require("../controllers/user");
const validator = require("../validators");
const router = express.Router();

router.get("/", getUser);

//from the front end, we are posting to the back end.  Saving it to the database,
router.post("/post", validator.createUserValidator, createUser);

module.exports = router;
