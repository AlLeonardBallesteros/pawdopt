import React from 'react';

const ImageModalFNH = ({ imageUrl, caption, breed, age, medhistory, gender, onClose  }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <img src={imageUrl} alt={caption} />
        <p>{caption}</p>
        <p>Breed: {breed}</p>
        <p>Gender: {gender}</p>
        <p>Age in months: {age}</p>
        <p>Medical History: {medhistory}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ImageModalFNH;