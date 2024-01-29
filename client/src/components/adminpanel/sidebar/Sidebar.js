import React from 'react'
import { Link } from 'react-router-dom';    
import 
{BsFillFilePersonFill} from 'react-icons/bs'
import {BiRegistered} from 'react-icons/bi'


function Sidebar({openSidebarToggle, OpenSidebar}) {
  return (
    <>
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
                <BsFillFilePersonFill  className='icon_header'/> Admin
            </div>
            <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>

        <ul className='sidebar-list'>
            <li className='sidebar-list-item'>
                <Link to="/admin-dashboard/contact">
                    <BiRegistered className='icon'/> ContactUs Messages
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to="/admin-dashboard/upload">
                    <BiRegistered className='icon'/> Upload
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to="/admin-dashboard/volunteer">
                    <BiRegistered className='icon'/> Volunteer Requests
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to="/admin-dashboard/adopt-a-friend">
                    <BiRegistered className='icon'/> Adopt a friend
                </Link>
            </li>
        </ul>
    </aside>
    </>
    
  )
}

export default Sidebar