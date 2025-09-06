const jwt = require("jsonwebtoken");
const User = require("../models/User");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ msg: "Usuario ya existe" });

    const user = await User.create({ name, email, password });
    res.json({ token: generateToken(user._id), user });
  } catch (err) {
    res.status(500).json({ msg: "Error servidor" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({ token: generateToken(user._id), user });
    } else {
      res.status(401).json({ msg: "Credenciales inválidas" });
    }
  } catch (err) {
    res.status(500).json({ msg: "Error servidor" });
  }
};