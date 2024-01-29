import React from 'react'
import { Route, Routes } from "react-router-dom";
import GalleryUpload from '../adminpages/GalleryUpload';
import ContactMessage from '../adminpages/ContactMessage'
import Volunteer from '../adminpages/Volunteer';
import AdoptAFriend from '../adminpages/AdoptAFriend';



function RouterAdmin() {
  return (
    <div>
      <Routes>
        <Route path="upload" element={<GalleryUpload />} />
        <Route path="contact" element ={<ContactMessage/>} />
        <Route path="volunteer" element ={<Volunteer/>} />
        <Route path="adopt-a-friend" element ={<AdoptAFriend/>} />
      </Routes>
    </div>
  )
}

export default RouterAdmin
