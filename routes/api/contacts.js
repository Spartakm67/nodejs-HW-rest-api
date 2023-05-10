const express = require('express');

const contacts = require("../../models/contacts");

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  }
  catch (error) {
    res.status(500).json({
      message: "Server error"
    })
  }
})

// router.get('/:contactId', async (req, res, next) => {
//   const result = await contacts.getContactById(req.params.contactId);
//   res.json(result)
// })

// router.post('/', async (req, res, next) => {
//   const newContact = await contacts.addContact(req.body);
//   res.json(newContact);
// });

// router.delete('/:contactId', async (req, res, next) => {
//   const result = await contacts.removeContact(req.params.contactId);
//   res.json(result);
// });

// router.put('/:contactId', async (req, res, next) => {
//   const result = await contacts.updateContact(req.params.contactId, req.body);
//   res.json(result);
// });

module.exports = router;
