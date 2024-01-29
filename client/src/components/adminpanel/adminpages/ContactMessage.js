import React, { useState, useEffect } from 'react';

function ContactusMessage() {
  const [usermessages, setUserMessages] = useState([]);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const fetchFormSubmissions = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/contact-us-submissions');
        const data = await response.json();
        setUserMessages(data);
      } catch (error) {
        console.error('Error fetching form submissions:', error);
      }
    };

    fetchFormSubmissions();
  }, []);

  const handleApprove = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/contact-us-approve/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.message === 'Volunteer form approved successfully') {
        setStatus('approved');
        window.alert('Volunteer form approved successfully!');
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Error approving volunteer form:', error);
      setStatus('error');
    }
  };

  const handleDecline = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/contact-us-decline/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.message === 'Volunteer form declined successfully') {
        setStatus('declined');
        window.alert('Volunteer form declined successfully!');

        setUserMessages((prevForms) => prevForms.filter((form) => form._id !== id));
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Error declining volunteer form:', error);
      setStatus('error');
    }
  };

  return (
    <div>
      <h2>Received Messages</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Time</th>
            <th>Date</th>
            <th>Message</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {usermessages.map((form, index) => (
            <tr key={index}>
              <td>{form.name}</td>
              <td>{form.email}</td>
              <td>{form.time}</td>
              <td>{form.date}</td>
              <td>{form.message}</td>
              <td>{form.status}</td>
              <td>
                {form.status === 'pending' && (
                  <div className='approve-decline'>
                    <button onClick={() => handleApprove(form._id)}>Approve</button>
                    <button onClick={() => handleDecline(form._id)}>Decline</button>
                    {status === 'error' && <p>Error occurred while processing the form.</p>}
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ContactusMessage;
