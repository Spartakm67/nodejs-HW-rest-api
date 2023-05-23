const express = require('express');
const crud = require("../../controllers/contacts-crud");
const router = express.Router();
const { schemas } = require("../../models/contact");
const { validateBody, isValidId, authenticate } = require("../../middleware");


router.get('/', authenticate, crud.getAll);

router.get('/:contactId', authenticate, isValidId, crud.getById);

router.post('/', authenticate, validateBody(schemas.addSchema), crud.add);

router.delete('/:contactId', authenticate, isValidId, crud.deleteById);

router.put('/:contactId', authenticate, isValidId, validateBody(schemas.addSchema), crud.updateById);

router.patch('/:contactId/favorite', authenticate, isValidId, validateBody(schemas.updateFavoriteSchema), crud.updateStatusContact);

module.exports = router;
