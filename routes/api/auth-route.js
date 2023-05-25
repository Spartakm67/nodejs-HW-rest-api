const express = require("express");
const ctrl = require("../../controllers/auth");
const { validateBody, authenticate } = require("../../middleware");
const { userSchemas } = require("../../models/user");
const router = express.Router();

router.post("/register", validateBody(userSchemas.registerSchema), ctrl.register);

router.post("/login", validateBody(userSchemas.loginSchema), ctrl.login);

router.post("/logout", authenticate, ctrl.logout);

router.get("/current", authenticate, ctrl.getCurrent);

router.patch("/subscription", authenticate, ctrl.updateSubscription);

module.exports = router;