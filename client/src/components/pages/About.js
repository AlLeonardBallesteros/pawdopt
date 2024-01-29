import React from 'react'
import './pagescss/AboutUs.css'
import bgaboutus from '../assets/bg-about-us.png'
import { Link } from 'react-router-dom'

function About() {
  return (
    <div className="about-us">
      <div className="bg-image-home">
        <img src={bgaboutus} alt="" width="100%" height="400" />
      </div>
      <div className="about-us-container">
      <h1>What is PAWDOPT</h1>
      <p>
      PAWDOPT was formed in this year 2023 by a dedicated group of animal lovers determined to help the<br></br>
      plight of animals in the Dagupan. We are a non-profit, non-government organization that receives no 
      government funding; we rely solely on private donations.
      </p>
      </div>
        <div className="content">
          <div className="vision">
            <h1>Vision</h1>
            <p>Empowering a world in which every animal finds a caring home and every adoption results in a joyous 
              occasion marked by compassion, hope, and fresh starts.</p>
          </div>
            <div className="mission">
            <h1>Mission</h1>
            <p>Connecting families with their perfect furry friends and finding forever homes for strays. 
              Our commitment: responsible pet ownership, animal rights, and compassionate adoptions.</p>
            </div>
          </div> 
              <div className="learn-more">
            <h3><Link to="/how-to">Learn more about what we do in our FAQs.</Link></h3>
            <h3><Link to="/help-us">Learn more about becoming a PAWDOPT volunteer.</Link></h3>
              </div>
              <div className='staff'>
            <h1>Staff Directory</h1>
                  </div>
                <div className="contributors">
                  <div className='dana'>
            <h2>Dana Abegail Manuel</h2>
            <p>Executive Director</p>
                  </div>
                  <div className='al'>
            <h2>Al Leonard Ballesteros</h2>
            <p>Client Services Representative</p>
                  </div>
                  <div className='andrei'>
            <h2>Andrei Valencirina</h2>
            <p>Volunteer Coordinator</p>
                  </div>
                  <div className='kc'>
            <h2>Kc Rose Calaguio</h2>
            <p>Finance</p>
                  </div>
                </div>
    </div>
  )
}

export default About
