const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.post("/", async (req, res) => {
    const { firstName, lastName, address, date, email, password, passwordConfirmation, role } = req.body;
    bcrypt.hash(password, 10).then((hash) =>{
      Users.create({
        firstName: firstName,
        lastName: lastName,
        address: address,
        date: date,
        email: email,
        password: hash,
        passwordConfirmation: passwordConfirmation,
        role: role
      });
      res.json("SUCCESS");
    })
  });

  router.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    const user = await Users.findOne({ where: { email: email } });
  
    if (!user) res.json({ error: "User Doesn't Exist" });
  
    bcrypt.compare(password, user.password).then((match) => {
      if (!match) res.json({ error: "Wrong email and password combination" });

      const accessToken = sign(
        { email: user.email, id: user.id },
        "amaramar"
      );
      
      const role = user.role;
      const firstName = user.firstName;
      const lastName = user.lastName;
  
      res.json({ accessToken, role, firstName, lastName });
    });
  });


module.exports = router;