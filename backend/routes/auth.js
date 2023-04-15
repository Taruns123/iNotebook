const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');



// create a user using post api/auth/ 
router.post('/createuser/',[
    body('name','enter a valid name').isLength({min:3}),
    body('email', 'enter a valid email').isEmail(),
    body('password', 'password should be atleast 5 digits').isLength({min: 5})

], async (req,res)=>{
    // for errors return bad request 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
//    res.send(req.body);

//check whether the user with the email already exists


      try{

        let user = await User.findOne({email : req.body.email});
        if(user){
          return res.status(400).json({error : "sorry the email entered already has an account try logging in"});
      }
    user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  })
  
  res.json(user);
}
  catch(error){
    console.error(error.message);
    res.status(500).send("some error occured!!!");
  }
  // .then(user => res.json(user));
  // .catch(err=> console.log(err));
  // res.json({"Nice": "nice"});
})

module.exports = router;