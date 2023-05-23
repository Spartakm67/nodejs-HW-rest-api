const express = require("express");
const ctrl = require("../../controllers/auth");
const { validateBody } = require("../../middleware");
const { userSchemas } = require("../../models/user");
const router = express.Router();

router.post("/register", validateBody(userSchemas.registerSchema), ctrl.register);

router.post("/login", validateBody(userSchemas.loginSchema), ctrl.login);

module.exports = router;