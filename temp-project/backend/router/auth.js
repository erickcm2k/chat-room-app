const { Router } = require("express");
const { check } = require("express-validator");

const { createUser, login, renew } = require("../controllers/auth");
const { validateFields } = require("../middlewares/validateFields");
const { validateJWT } = require("../middlewares/validateJWT");

const router = Router();

// Create new users
router.post(
  "/new",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").not().isEmpty(),
    validateFields,
  ],
  createUser
);

// Login
router.post(
  "/",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").not().isEmpty(),
    validateFields,
  ],
  login
);

// Renew token
router.get("/renew", validateJWT, renew);

module.exports = router;
