const { Router } = require("express");
const { getMessages } = require("../controllers/messages");

const { validateJWT } = require("../middlewares/validateJWT");

const router = Router();

router.get("/:from", validateJWT, getMessages);

module.exports = router;
