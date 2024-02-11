const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err, response) => {
        if (response) {
          const token = jwt.sign({ email: user.email, role: user.role }, "test", { expiresIn: '1d' });
          res.cookie('token', token);
          return res.json({ Status: "Success", role: user.role});
        } else {
          return res.json("The password is incorrect");
        }
      });
    } else {
      return res.json("No record existed");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const register = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ firstname, lastname, email, password: hashedPassword });
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const varifyUser = (req, res, next) => {
  const token = req.cookies?.token; // Use optional chaining for resilience

  if (!token) {
    return res.status(401).json("Token is missing"); // Use appropriate status code
  }

  try {
    const decoded = jwt.verify(token, "jwt-secret-key"); // Use a try-catch block

    if (decoded.role === "Admin") {
      next();
    } else {
      return res.status(403).json("Unauthorized: Not an admin"); // Use appropriate status code
    }
  } catch (err) {
    console.error(err); // Log the error for debugging
    return res.status(401).json("Invalid or expired token"); // Provide meaningful error message
  }
};





module.exports = {login, register, varifyUser}
