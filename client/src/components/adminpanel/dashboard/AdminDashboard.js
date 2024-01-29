import { useState } from 'react'
import AdminPages from '../routesadmin/RouterAdmin'
import Sidebar from '../sidebar/Sidebar'
import AdminHeader from '../adminheader/AdminHeader'
import './Sidebar.css'

function AdminDashboard() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
  return (
    <div className='admin-dashboard'>
      <AdminHeader OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <AdminPages />
    </div>
  )
}

export default AdminDashboard
