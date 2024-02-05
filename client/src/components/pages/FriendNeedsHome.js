import React, { useState, useEffect } from "react";
import axios from "axios";
import "./pagescss/FriendNeedsHome.css";
import ImageModal from "./ImageModalFNH";

function FriendNeedsHome() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [usergalleryData, setuserGalleryData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [caption, setCaption] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [medhistory, setMedHistory] = useState("");

  const handleEditCaption = (event) => {
    setCaption(event.target.value);
  };
  const handleEditBreed = (event) => {
    setBreed(event.target.value);
  };
  const handleEditGender = (event) => {
    setGender(event.target.value);
  };
  const handleEditAge = (event) => {
    setAge(event.target.value);
  };
  const handleEditMedHistory = (event) => {
    const { value } = event.target;
    if (medhistory.includes(value)) {
        // If already selected, remove it from the array
        setMedHistory(medhistory.filter(term => term !== value));
    } else {
        // If not selected, add it to the array
        setMedHistory([...medhistory, value]);
    }
};

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

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

  const handleAddToGallery = async () => {
    try {
      const formData = new FormData();
      formData.append("images", selectedImage);
      formData.append("caption", caption);
      formData.append("breed", breed);
      formData.append("gender", gender);
      formData.append("age", age);
      formData.append("medhistory", medhistory);

      await axios.post("http://localhost:8000/api/user/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Image uploaded successfully");

      // Reset form fields
      setSelectedImage(null);
      setCaption("");
      setBreed("");
      setGender("");
      setAge("");
      setMedHistory("");

      // Refresh the page by reloading it
      window.location.reload();
      fetchData();
    } catch (error) {
      console.error("Error uploading:", error);
      console.log("Error response:", error.response); // Log the detailed response
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const openModal = (imageUrl, caption, breed, gender, age, medhistory) => {
    setSelectedImage({ imageUrl, caption, breed, gender, age, medhistory });
    setIsModalOpen(true);

    // Add a class to the modal image when it is open
    document.body.classList.add("modal-open");
  };

  const closeModal = () => {
    setIsModalOpen(false);

    // Remove the class when the modal is closed
    document.body.classList.remove("modal-open");
  };
  return (
    <div className="gallery-main">
      <div className="gallery-container">
        <button onClick={() => setIsFormVisible(!isFormVisible)}>
          {isFormVisible
            ? "hide pet adoption advocate"
            : "pet adoption advocate"}
        </button>
        {isFormVisible && (
          <div>
            <input type="file" accept="images/*" onChange={handleFileChange} multiple/>
            <input
              type="text"
              placeholder="Caption"
              value={caption}
              onChange={handleEditCaption}
            />
            <input
              type="text"
              placeholder="Breed"
              value={breed}
              onChange={handleEditBreed}
            />
            <select
              value={gender}
              onChange={handleEditGender}
            > 
              <option value="" disabled>Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <input
              type="text"
              placeholder="Age in months"
              value={age}
              onChange={handleEditAge}
            />

            <div>
                {/* Assuming medhistory is an array of selected medical terms */}
                <label>Medical History:</label>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            value="vaccinated"
                            checked={medhistory.includes("vaccinated")}
                            onChange={handleEditMedHistory}
                        />
                        Vaccinated
                    </label>
                </div>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            value="dewormed"
                            checked={medhistory.includes("dewormed")}
                            onChange={handleEditMedHistory}
                        />
                        Dewormed
                    </label>
                </div>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            value="neutered"
                            checked={medhistory.includes("neutered")}
                            onChange={handleEditMedHistory}
                        />
                        Neutered
                    </label>
                </div>
                {/* Add more checkboxes for other medical terms as needed */}
            </div>
            <button onClick={handleAddToGallery}>Add to Gallery</button>
          </div>
        )}
      </div>
      <div className="uploaded-images">
        {usergalleryData.map((item, index) => (
          <div
            key={index}
            onClick={() =>
              openModal(item.imageUrl, item.caption, item.breed, item.gender, item.age, item.medhistory)}
          >
            <img
              src={`http://localhost:8000/uploads/${item.imageUrl}`}
              alt={item.caption}
              className="gallery-images"
            />
          </div>
        ))}
      </div>
      {isModalOpen && (
        <ImageModal
          imageUrl={`http://localhost:8000/uploads/${selectedImage.imageUrl}`}
          caption={selectedImage.caption}
          breed={selectedImage.breed}
          gender={selectedImage.gender}
          age={selectedImage.age}
          medhistory={selectedImage.medhistory}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

export default FriendNeedsHome;
