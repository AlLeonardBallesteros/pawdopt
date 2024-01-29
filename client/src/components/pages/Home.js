import React, { useState, useEffect, useRef } from 'react';
import bghomemain1 from '../assets/bg-home-main1.png'
import bghomemain2 from '../assets/bg-home-main2.png'
import bghomemain3 from '../assets/bg-home-main3.png'
import bghomemain4 from '../assets/bg-home-main4.png'
import bghomemain5 from '../assets/bg-home-main5.png'
import bghomemain6 from '../assets/bg-home-main6.png'
import bghomemain7 from '../assets/bg-home-main7.png'
import bghome2 from '../assets/bg-home-v2.png'
import friend1 from '../assets/home-friend1.png'
import friend2 from '../assets/home-friend2.png'
import friend3 from '../assets/home-friend3.png'
import friend4 from '../assets/home-friend4.png' 
import friend5 from '../assets/home-friend5.png'
import './pagescss/Home.css'



function Home() {
  const images = [bghomemain1, bghomemain2, bghomemain3, bghomemain4, bghomemain5, bghomemain6, bghomemain7];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imageRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [images.length]);

  
  return (
    <div className="home-container">
      <div
        className="bg-home"
        style={{
          position: 'relative',
          backgroundImage: `url(${images[currentImageIndex]})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          width: 'auto',
          height: '600px',
        }}
        ref={imageRef}
      >
      </div>
      <div className="adopt-friend">
        <h1>Adopt a Friend</h1>
        </div>
        <div className="human-friend">
            <img src={bghome2} alt="" />
            <div className="text-container">
        <h3>Provide a happy home</h3>
        <p>Providing a loving and nurturing environment ensures that pets have a happy and secure home where they can thrive.</p>
        </div>
          </div>
      <div className="text-section">
        <h1>Adoption Benefits</h1>
        <p>
        Each year, millions of pets are available through animal shelters around the world. These fur babies 
        can make wonderful additions to your family, even if their previous owners faced challenges or had unrealistic expectations 
        about pet ownership. At the Pet Adoption Center, our dedicated staff puts in every effort to ensure that the animals we 
        select for adoption are the perfect match for you.</p>

        <p>Our team diligently collects a complete history of each animal, addresses any medical issues, and assesses their 
        temperament. This thorough process ensures that these pets can seamlessly transition into your loving home.</p>

        <p>In addition to offering well-matched pets, shelters provide valuable counseling and support for pet parents. We're 
          committed to helping you with the joys and challenges of pet ownership. Furthermore, adopting from shelters is often a 
          more cost-effective option compared to other animal facilities.</p>
      </div>
      <div className="image-grid">
        <div className="text">
      <h1>Fur Babies</h1>
         </div>
      <div className="friend-button">
        <button><img src={friend1} alt="" /></button>
        <button><img src={friend2} alt="" /></button>
        <button><img src={friend4} alt="" /></button>
        <button><img src={friend3} alt="" /></button>
        <button><img src={friend5} alt="" /></button>
        </div>
      </div>
    </div>
  )
}

export default Home
