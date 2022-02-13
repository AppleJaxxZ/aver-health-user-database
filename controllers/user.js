const User = require("../models/user");

exports.getUser = (req, res) => {
  const user = User.find()
    .select("_id pinNumber dateOfBirth phoneNumber")
    .then((user) => {
      res.json({ user });
    })
    .catch((err) => console.log(err));
};

exports.createUser = (req, res) => {
  const user = new User(req.body);
  console.log('Creating User:', req.body);

  user.save((err, result) => {
    res.json({
      user: result,
    })
  })
}