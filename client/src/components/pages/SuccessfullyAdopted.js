import React, { useState, useEffect } from "react";
import axios from "axios";
import ImageModal from "./ImageModalSA";

function SuccessfullyAdopted() {
  const [galleryData, setGalleryData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    // Fetch data from the backend when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/gallery");
        setGalleryData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const successfullyAdoptedImages = galleryData.filter(
    (item) => item.category === "successfully adopted"
  );

  const openModal = (imageUrl, caption) => {
    setSelectedImage({ imageUrl, caption });
    setIsModalOpen(true);
    document.body.classList.add("modal-open");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.classList.remove("modal-open");
  };
  return (
    <div className="gallery-main">
      <div className="uploaded-images clearfix">
        {successfullyAdoptedImages.map((item, index) => (
          <div
            key={index}
            onClick={() =>
              openModal(item.imageUrl, item.caption, item.category)
            }
          >
            <img
              src={`http://localhost:8000/uploads/${item.imageUrl}`}
              alt={item.caption}
            />
            <p>{item.caption}</p>
          </div>
        ))}
      </div>
      {isModalOpen && (
        <ImageModal
          imageUrl={`http://localhost:8000/uploads/${selectedImage.imageUrl}`}
          caption={selectedImage.caption}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

export default SuccessfullyAdopted;
