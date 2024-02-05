const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path"); 


const userController = require('./controller/user');
const galleryController = require('./controller/galleryController');
const usergalleryController = require('./controller/usergalleryController');
const volunteerController = require('./controller/volunteerController');
const  handleFormSubmission  = require('./controller/formController');

const app = express();

const uri = "mongodb+srv://data01373:OepnDoJnQNUaTZ5g@cluster0.tqvgwks.mongodb.net/?retryWrites=true&w=majority";

async function connect() {
  try {
    await mongoose.connect(uri);  
    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
}


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Serve uploaded images from the 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//check on seclected port if the backend runs sucessfully
app.get("/", (req, res) => {
  res.send("ako to");
}); 

//sign in, sign up, reset password for user
app.post('/signup', userController.signup);
app.post('/signin', userController.signin);
app.post('/submit-otp', userController.submitotp);
app.post('/send-otp', userController.sendotp);

//admin upload image crud
app.post('/api/upload', galleryController.upload.single('image'), galleryController.handleUpload);
app.get('/api/gallery', galleryController.getGallery);
app.put('/api/gallery/:id', galleryController.editImage);
app.delete('/api/gallery/:id', galleryController.deleteImage);

//user upload image
app.post('/api/user/upload', usergalleryController.upload.array('images', 5), usergalleryController.userHandleupload);
app.get('/api/user/gallery', usergalleryController.usergetGallery);
app.delete('/api/user/gallery/:id', usergalleryController.userdeleteImage);

//volunteer user
app.post('/api/volunteer-forms', volunteerController.volunteersubmitForm);
//admin approve and decline to volunteer form
app.get('/api/volunteer-forms-get', volunteerController.getVolunteerForms)
app.put('/api/volunteer-approve/:id', volunteerController.adminApproveForm);
app.delete('/api/volunteer-decline/:id', volunteerController.adminDeclineForm);

//contact us
app.post('/api/contact-us', handleFormSubmission.handleFormSubmission);
//admin contact us
app.get('/api/contact-us-submissions', handleFormSubmission.getFormSubmissions);
app.put('/api/contact-us-approve/:id', handleFormSubmission.adminApproveAppointment);
app.delete('/api/contact-us-decline/:id', handleFormSubmission.adminDeclineAppointment);
app.listen(8000, () => {
  console.log(`SERVER STATUS: Listening on port 8000`);
});

connect();
