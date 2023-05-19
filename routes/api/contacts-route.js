const express = require('express');
const ctrl = require("../../controllers/contacts");
const router = express.Router();
// const { addSchema } = require("../../schemas/contacts-schemas");
// const { validateBody } = require("../../decorators");


router.get('/', ctrl.getAll);

// router.get('/:contactId', ctrl.getById);

// router.post('/', validateBody(addSchema), ctrl.add);

router.post('/', ctrl.add);

// router.delete('/:contactId', ctrl.deleteById);

// router.put('/:contactId', validateBody(addSchema), ctrl.updateById);

module.exports = router;
