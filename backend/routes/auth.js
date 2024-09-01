const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const JWT_SECRET = "Harry saghoffboy"
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');


router.post('/createuser', [

  body('name', 'sdsdsdd').isLength({ min: 3 }),
  body('email').isEmail(),
  body('password').isLength({ min: 5 })
], async (req, res) => {
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success, errors: errors.array() });
  }

  try {

    let user = await User.findOne({ email: req.body.email });
    if (user) { return res.status(400).json({ success, errors: "Sorry, a user with this email already exists" }) }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);


    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
    });

    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({ success, authtoken });

    //  res.json(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }

}

)
router.post('/login', [
  body('email').isEmail(),
  body('password', 'Password cannot be blank').exists()
], async (req, res) => {
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      success = false;
      return res.status(400).json({ error: "Please try again" })
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      success = false;
      return res.status(400).json({success,  error: "Please try" })

    }
    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({ success, authtoken });

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
})

// Route 3

router.post('/getuser', fetchuser, async (req, res) => {

  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }

})

module.exports = router;

