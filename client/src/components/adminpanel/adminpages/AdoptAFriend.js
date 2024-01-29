import React, { useState, useEffect } from "react";
import axios from "axios";

function AdoptAFriend() {

  const [usergalleryData, setuserGalleryData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/user/gallery"
      );
      setuserGalleryData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const userhandleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this image?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8000/api/user/gallery/${id}`);
        setuserGalleryData((prevData) =>
          prevData.filter((item) => item._id !== id)
        );
        window.location.reload();
      } catch (error) {
        console.error("Error deleting image:", error);
      }
    }
  };
  return (
    <div className="gallery-main">
      <div className="gallery-container">      
      </div>
      <div className="uploaded-images clearfix">
        {usergalleryData.map((item, index) => (
          <div
            key={index}>
            <img
              src={`http://localhost:8000/uploads/${item.imageUrl}`}
              alt={item.caption}
              className="gallery-images"
            />
            <p>{item.caption}</p>
            <button onClick={() => userhandleDelete(item._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdoptAFriend;
