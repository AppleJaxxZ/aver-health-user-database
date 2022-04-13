const { Mongoose } = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const User = require("../models/user");
var AWS = require('aws-sdk');

// you shouldn't hardcode your keys in production! See http://docs.aws.amazon.com/AWSJavaScriptSDK/guide/node-configuring.html
AWS.config.update({ accessKeyId: process.env.ACCESS_KEY_ID, secretAccessKey: process.env.AWS_SECRET_KEY, region: 'us-east-1' });

const lambda = new AWS.Lambda();

exports.getUser = async (req, res) => {
  const users = await User.find({ subscriptions: { status: 'active' } });
  try {
    await users.forEach(user => {
      console.log(user)
      const params = {
        FunctionName: 'newestScraper', /* required */
        Payload: JSON.stringify({
          pinNumber: user.pinNumber,
          phoneNumber: user.phoneNumber,
          dateOfBirth: user.dateOfBirth,
        })
      };
      console.log(params.Payload.subscriptions)
      lambda.invoke(params, function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else console.log(data); return data;         // successful response
      });

    })
    return res.json("Lambdas launched")
  } catch (err) {
    console.log(err)
  }

};

exports.updateUser = (req, res) => {

}

exports.createUser = (req, res) => {
  const user = new User(req.body);
  console.log('Creating User:', req.body);

  user.save((err, result) => {
    res.json({
      user: result,
    })
  })
}

exports.callLambda = (req, res) => {
  const userPin = req.params.pinNumber;

  // const user = User.find(userPin, function (err, foundUser) {
  //   console.log(user)
  //   res.json({ foundUser })
  // })
  const user = User.find({})
    .select("pinNumber")
    .then((user) => {
      res.json({ user });
      console.log("Phone?:", user)
    })
    .catch((err) => console.log(err));
  console.log(user)

}

exports.deleteUser = (res, req) => {
  const user = new User(req.body)
  res.json({ user })
  const query = User.where({ user });
  const persons = query.findOneAndDelete();

}