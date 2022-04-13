const express = require("express");
const { getUser, createUser, callLambda, deleteUser } = require("../controllers/user");
const validator = require("../validators");
const router = express.Router();

router.get("/", getUser);

//from the front end, we are posting to the back end.  Saving it to the database,
router.post("/post", validator.createUserValidator, createUser);

router.get("/users/:pinNumber", callLambda)


router.delete("/removeUser", deleteUser)

module.exports = router;
