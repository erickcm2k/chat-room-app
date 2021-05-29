const User = require("../models/user");
const bcrypt = require("bcryptjs");
const createUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const hasEmail = await User.findOne({ email: email });

    if (hasEmail) {
      res.status(400).json({
        ok: false,
        msg: "El correo ya ha sido registrado anteriormente.",
      });
    }
    console.log(req.body);
    const user = new User(req.body);
    // Encrypt password.
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    // Save user in db.
    await user.save();

    res.json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador del sistema",
    });
  }
};

// Login
const login = async (req, res) => {
  const { email, password } = req.body;

  res.json({
    ok: true,
    usuario: "ABC",
    email,
    password,
  });
};

const renew = async (req, res) => {
  res.json({
    ok: true,
    usuario: "ABC",
  });
};

module.exports = {
  createUser,
  login,
  renew,
};
