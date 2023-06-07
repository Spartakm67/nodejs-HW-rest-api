const express = require("express");
const ctrl = require("../../controllers/auth");
const { validateBody, authenticate, upload } = require("../../middleware");
const { userSchemas } = require("../../models/user");
const router = express.Router();

router.post("/register", validateBody(userSchemas.registerSchema), ctrl.register);

router.get("/verify/:verificationCode", ctrl.verify);   

router.post("/login", validateBody(userSchemas.loginSchema), ctrl.login);



router.post("/logout", authenticate, ctrl.logout);

router.get("/current", authenticate, ctrl.getCurrent);

router.patch("/subscription", authenticate, ctrl.updateSubscription);

router.patch("/avatars", authenticate, upload.single("avatar"), ctrl.updateAvatar);

module.exports = router;