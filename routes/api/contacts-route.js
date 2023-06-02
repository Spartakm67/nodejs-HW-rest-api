const express = require('express');
const crud = require("../../controllers/contacts-crud");
const router = express.Router();
const { schemas } = require("../../models/contact");
const { validateBody, isValidId, authenticate, upload } = require("../../middleware");

router.use(authenticate);

router.get('/', crud.getAll);

router.get('/:contactId', isValidId, crud.getById);

router.post('/', upload.single("avatar"), validateBody(schemas.addSchema), crud.add);

router.delete('/:contactId', isValidId, crud.deleteById);

router.put('/:contactId', isValidId, validateBody(schemas.addSchema), crud.updateById);

router.patch('/:contactId/favorite', isValidId, validateBody(schemas.updateFavoriteSchema), crud.updateStatusContact);

module.exports = router;
