const FormSubmission = require('../models/formsubmitModel');


const handleFormSubmission = async (req, res) => {
  try {
  const { name, email, time, date, message } = req.body;

  const newFormSubmission = new FormSubmission({
    name,
    email,
    time,
    date,
    message
  });

  await newFormSubmission.save();

  res.json({ message: 'Contact us form submitted successfully' });
} catch (error) {
  console.error('Error submitting Appointment form:', error);
  res.status(500).json({ error: 'Internal server error' });
}
};


const getFormSubmissions = async (req, res) => {
  try {
    const usermessages = await FormSubmission.find();
    res.json(usermessages);
  } catch (error) {
    console.error('Error fetching all Appointment forms:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const adminApproveAppointment = async (req, res) => {
  const formId = req.params.id;

  try {
    const usermessages = await FormSubmission.findById(formId);
    if (!usermessages) {
      return res.status(404).json({ error: 'Appointment form not found' });
    }

    // Update the status to 'approved'
    usermessages.status = 'approved';
    await usermessages.save();

    res.json({ message: 'Appoinrment form approved successfully' });
  } catch (error) {
    console.error('Error approving Appointment form:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Admin decline endpoint
const adminDeclineAppointment = async (req, res) => {
  const formId = req.params.id;

  try {
    const usermessages = await FormSubmission.findOneAndUpdate(
      { _id: formId },
      { $set: { status: 'declined' } },
      { new: true }
    );

    if (!usermessages) {
      return res.status(404).json({ error: 'Volunteer form not found' });
    }

    res.json({ message: 'Volunteer form declined successfully' });
  } catch (error) {
    console.error('Error declining Appointment form:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
module.exports = { handleFormSubmission, getFormSubmissions, adminDeclineAppointment, adminApproveAppointment };