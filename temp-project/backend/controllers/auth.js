const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { generateJWT } = require("../helpers/jwt");
const createUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const hasEmail = await User.findOne({ email: email });

    if (hasEmail) {
      return res.status(400).json({
        ok: false,
        msg: "El correo ya ha sido registrado anteriormente.",
      });
    }

    const user = new User(req.body);
    // Encrypt password.
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    // Save user in db.
    await user.save();

    // Generate JWT.
    const token = await generateJWT(user.id);

    // Send data to the user.
    res.json({ ok: true, user, token });
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

  try {
    // Validate email
    const dbUser = await User.findOne({ email });
    if (!dbUser) {
      return res.status(404).json({
        ok: false,
        msg: "Email no encontrado",
      });
    }

    // Validate password
    const isValidPassword = bcrypt.compareSync(password, dbUser.password);
    if (!isValidPassword) {
      return res
        .status(404)
        .json({ ok: false, msg: "Password is not correct" });
    }

    // Generate jwt
    const token = await generateJWT(dbUser.id);

    res.json({
      ok: true,
      user: dbUser,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador del sistema",
    });
  }
};

const renew = async (req, res) => {
  const uid = req.uid;

  // Generate a new JWT
  const token = await generateJWT(uid);

  // Get user by uid
  const user = await User.findById(uid);

  res.json({
    ok: true,
    user,
    token,
  });
};

module.exports = {
  createUser,
  login,
  renew,
};
