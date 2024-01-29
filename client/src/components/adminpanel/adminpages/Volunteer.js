import React, { useState, useEffect } from 'react';

function Volunteer() {
  const [volunteerForms, setVolunteerForms] = useState([]);
  const [status, setStatus] = useState(null); 

  useEffect(() => {
    const fetchVolunteerForms = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/volunteer-forms-get');
        const data = await response.json();
        setVolunteerForms(data);
      } catch (error) {
        console.error('Error fetching volunteer forms:', error);
      }
    };
    fetchVolunteerForms();
  }, []);

  const handleAdminApprove = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/volunteer-approve/${id}`, {
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
  
  
  const handleAdminDecline = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/volunteer-decline/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const data = await response.json();
  
      if (data.message === 'Volunteer form declined successfully') {
        setStatus('declined');
        window.alert('Volunteer form declined successfully!');
  
        // Update the volunteerForms state to remove the declined form
        setVolunteerForms(prevForms => prevForms.filter(form => form._id !== id));
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
      <h1>Volunteer Forms</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Contact</th>
            <th>Location</th>
            {/* Add more columns as needed */}
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
      {volunteerForms.map((form, index) => (
        <tr key={index}>
          <td>{form.name}</td>
          <td>{form.contact}</td>
          <td>{form.location}</td>
          {/* Add more columns as needed */}
          <td>{form.status}</td>  
          <td>
            {form.status === 'pending' && (
              <div className='approve-decline'>
                <p>Status: Pending Approval</p>
                {/* Render buttons for admin approval/decline */}
                <button onClick={() => handleAdminApprove(form._id)}>Approve</button>
                <button onClick={() => handleAdminDecline(form._id)}>Decline</button>
              </div>
            )}
            {form.status === 'approved' && <p>Status: Approved</p>}
            {form.status === 'declined' && <p>Status: Declined</p>}
            {status === 'error' && <p>Error occurred while processing the form.</p>}
          </td>
        </tr>
      ))}
    </tbody>

      </table>
    </div>
  );
}

export default Volunteer;
