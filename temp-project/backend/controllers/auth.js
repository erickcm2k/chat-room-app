const { validationResult } = require("express-validator");

const createUser = async (req, res) => {
  res.json({
    ok: true,
    msg: "new",
  });
};

// Login
const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.mapped(),
    });
  }
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
