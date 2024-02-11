import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import AdminPages from '../routesadmin/RouterAdmin'
import Sidebar from '../sidebar/Sidebar'
import AdminHeader from '../adminheader/AdminHeader'
import './Sidebar.css'

function AdminDashboard() {
  const [success, setSuccess] = useState(null); // Changed 'Succes' to 'Success' and initialized state to null
  const navigate = useNavigate();
  
  useEffect(() => {
    axios.get('http://localhost:8000/admin-dashboard')
      .then(res => {
        if (res.data === "Success") {
          setSuccess("Success OK");
        } else {
          navigate('/');
        }
      })
      .catch(err => {
        if (err.response) {

          console.log("Server responded with an error:", err.response.data);
        } else if (err.request) {
          console.log("No response received from server:", err.request);
        } else {
          console.log("Error while setting up the request:", err.message);
        }
      });
  }, [navigate]);

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  }

  return (
    <div className='admin-dashboard'>
      <AdminHeader OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <p>{success}</p>
      <AdminPages />
    </div>
  );
}

export default AdminDashboard;
