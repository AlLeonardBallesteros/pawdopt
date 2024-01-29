import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './adminpagescss/GalleryUpload.css'


function GalleryUpload() {
  const [galleryData, setGalleryData] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [caption, setCaption] = useState('');
  const [category, setCategory] = useState('');

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/gallery');
      setGalleryData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleCaptionChange = (event) => {
    setCaption(event.target.value);
  };
  const handleEdit = async (id) => {
    const newCaption = prompt('Enter a new caption:');
    if (newCaption !== null) {
  
      const formData = new FormData();
      formData.append('caption', newCaption);
  
      //if (newImageFile) {
        
        //formData.append('image', newImageFile); }
  
      try {
        await axios.put(`http://localhost:8000/api/gallery/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        fetchData(); // Refresh the gallery data after editing
      } catch (error) {
        console.error('Error editing image:', error);
      }
    }
  };
  

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this image?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8000/api/gallery/${id}`);
        setGalleryData((prevData) => prevData.filter(item => item._id !== id));
        window.location.reload();
      } catch (error) {
        console.error('Error deleting image:', error);
      }
    }
  };
  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('image', selectedFile);
      formData.append('category', category);
      formData.append('caption', caption);
  
      await axios.post('http://localhost:8000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      alert('Image uploaded successfully');
  
      // Reset form fields
      setSelectedFile(null);
      setCategory('');
      setCaption('');
  
      // Refresh the page by reloading it
      window.location.reload();
    } catch (error) {
      console.error('Error uploading:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h2>Admin Upload</h2>
      <label>
        Select Category:
        <select value={category} onChange={handleCategoryChange }>
          <option> Select option</option>
          <option value="successfully adopted">Successfully Adopted Pets</option>
          <option value="item donated">Item Donations</option>
        </select>
      </label>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <input
        type="text"
        placeholder="Caption"
        value={caption}
        onChange={handleCaptionChange}
      />
      <button onClick={handleUpload}>Upload</button>
      <h3>Uploaded Images</h3>
      <div className='uploaded-images clearfix'>
        {galleryData.map((item, index) => (
          <div key={index}>
            <img src={`http://localhost:8000/uploads/${item.imageUrl}`} alt={item.caption} />
            <p>{item.caption}</p>
            <p>{item.category}</p>
            <button onClick={() => handleEdit(item._id)}>Edit</button>
            <button onClick={() => handleDelete(item._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GalleryUpload;
