const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");
const { createUser, login, renew } = require("../controllers/auth");

router.post("/new", createUser);

// Login
router.post(
  "/",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").not().isEmpty(),
  ],
  login
);

router.get("/renew", renew);

module.exports = router;
