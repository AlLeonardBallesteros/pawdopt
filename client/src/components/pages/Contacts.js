  import React, { useState } from "react";
  import { Form, Button } from "react-bootstrap";
  import './pagescss/Contact.css'
  import bgcontact from '../assets/bg-contact-us.png'
  import bgcontactinfo from '../assets/bg-contact-info.png'
  import { AiFillMail } from 'react-icons/ai'
  import { BsFillTelephoneFill, BsFillPhoneFill } from 'react-icons/bs'

  function Contacts() {
    // Initialize form data using the useState hook
    const [usermessages, setUserMessages] = useState({
      name: "",
      email: "",
      time: "",
      date: "",
    });
    const [status, setStatus] = useState(null);

   const fetchContactusForms = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/contact-us-submissions');

      if (!response.ok) {
        throw new Error(`Failed to fetch volunteer forms. Server responded with status: ${response.status}`);
      }

      // Do something with the response if needed

    } catch (error) {
      console.error('Error fetching volunteer forms:', error.message);
    }
  };
  
  const isDateValid = () => {
    const currentDate = new Date();
    const selectedDate = new Date(usermessages.date);
    return currentDate <= selectedDate;
  };

  const handleSubmitContact = async (e) => {
    e.preventDefault();

    if (!isDateValid()) {
      setStatus('error');
      window.alert('Invalid date. Please select a date equal to or after today.');
      return;
    }

    try {
      
      const response = await fetch('http://localhost:8000/api/contact-us', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(usermessages),
      });

      const data = await response.json();

      if (data.message === 'Contact us form submitted successfully') {
        setStatus('pending'); // Set the initial status to 'pending'
        window.alert('Contact us form submitted successfully! Wait for the response of the admin');

        // Trigger a refetch of volunteer forms on the admin side
        fetchContactusForms();
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Error submitting volunteer form:', error);
      setStatus('error');
    }
  };

    return (
      <main className="contact-us">
        <div id="bg-image">
        <img src={bgcontact} alt="" width="100%" height="500" />
        </div>
        <div className="questions">
          <h1>Get in Touch with Us</h1>
        </div>
        <div className="appointment" id="appointment">
        {status && <p>Status: {status}</p>}
        <h1>Appointment</h1>
        <Form onSubmit={handleSubmitContact}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              value={usermessages.name}
              onChange={(e) => setUserMessages({ ...usermessages, name: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email address"
              value={usermessages.email}
              onChange={(e) => setUserMessages({ ...usermessages, email: e.target.value })}
              autoComplete="on"
              required
            />
          </Form.Group>

          <Form.Group controlId="time">
            <Form.Label>Time</Form.Label>
            <Form.Control
              type="time"
              placeholder="Select Time"
              value={usermessages.time}
              onChange={(e) => setUserMessages({ ...usermessages, time: e.target.value })}
              required
            />
          </Form.Group>
          <Form.Group controlId="date">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              placeholder="Select Date"
              value={usermessages.date}
              onChange={(e) => setUserMessages({ ...usermessages, date: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group controlId="message">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Type your message here"
              value={usermessages.message}
              onChange={(e) => setUserMessages({ ...usermessages, message: e.target.value })}
              required
            />
          </Form.Group>

          <Button type="submit">Submit</Button>
        </Form>
        </div>
        <div className="contact-info" id="contact-info" style={{ backgroundImage: `url(${bgcontactinfo})`,
      backgroundSize: '50%',
      backgroundPosition: 'right bottom',
      backgroundRepeat: 'no-repeat' }}>
          <div className="service-info">
            <h2>Helpline Services:</h2>
            <h5>Call or Text us</h5>
            <p><BsFillTelephoneFill className='icon-about-us'/>877 000 0000</p>
            <p><BsFillPhoneFill className='icon-about-us'/>09875248262</p>
            </div>
          <div className="store-hours">
            <h2>Office Hours and Address:</h2>
            <p>Monday to Friday 9:00 am - 6:00 pm</p>
            <p>Closed on Saturdays and Sundays</p>
            <p>4th Floor PawDopt Building, 250 Rizal Street, Dagupan City</p>
            </div>
            
          <div className="mailing-address">
            <h2>E-mail us at:</h2>
            <p><AiFillMail className='icon-about-us'/>PawDopt@gmail.com</p>
          </div>
          </div>
      </main>
    );
  }

  export default Contacts;