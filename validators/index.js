exports.createUserValidator = (req, res, next) => {
  //pinNumber
  req.check("pinNumber", "Enter your 7 digit pin number").notEmpty();
  req.check("pinNumber", "Your Pin must be 7 characters").isLength({
    min: 7,
    max: 7,
  });
  //dateOfBirth
  req.check("dateOfBirth", "Enter Your Date Of Birth").notEmpty();
  req.check("dateOfBirth", "There must be exactly 10 characters mm/dd/yyyy format(forward slash must be included)").isLength({
    min: 10,
    max: 10,
  });
  //phoneNumber
  req.check("phoneNumber", "Please enter your phone number").notEmpty();
  req.check("phoneNumber", "There must be exactly 11 characters in your phoneNumber, start with 1 then the rest of your 10 digit number").isLength({
    min: 11,
    max: 11
  })

  //check for errors
  const errors = req.validationErrors();
  //if error show the first one as they happen
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }

  //proceed to next middleware
  next();
};