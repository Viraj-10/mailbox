const express = require('express');
const {
  getInbox,
  createMail,
  getSentMail,
  getMailByID,
  deleteMail,
} = require('../controllers/mail');

const Mail = require('../models/Mail');

const router = express.Router({ mergeParams: true });

// const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);
router.route('/').get(getInbox).post(createMail);
router.route('/sent').get(getSentMail);
router.route('/:id').get(getMailByID).delete(deleteMail);

module.exports = router;
