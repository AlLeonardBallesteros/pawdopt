const mongoose = require('mongoose');

const formSubmissionSchema = new mongoose.Schema({
  name: String,
  email: String,
  time: String,
  date: String,
  message: String,
  status: { type: String, default: 'pending' },
});

const FormSubmission = mongoose.model('FormSubmission', formSubmissionSchema);

module.exports = FormSubmission;
