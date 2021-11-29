const mongoose = require('mongoose');

const MailSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: [true, 'Email Subject is required'],
  },
  body: String,
  to: {
    type: [String],
    required: [true, 'Receivers Email Id is required'],
  },

  from: {
    type: [String],
    required: [true, 'Senders Email Id is required'],
  },
  cc: [String],
  bcc: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  replyTo: mongoose.Schema.ObjectId,
});

module.exports = mongoose.model('Mail', MailSchema);
