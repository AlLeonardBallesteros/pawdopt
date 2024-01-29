import React from 'react';
import './pagescss/How.css'
import { GoDotFill } from 'react-icons/go'
import bghow from '../assets/bg-how.png'

function How() {
  return (
    <div className='how-container' style={{ backgroundImage: `url(${bghow})`,
    backgroundSize: '100% 100%',
    backgroundPosition: 'relative',
    backgroundRepeat: 'no-repeat' }}>
      <div className="how">
        <h1>What do you need to know before adopting a Fur Baby:</h1>
      </div>
      <div className="paragraph">
        <h2>Application</h2>
        <p>The first pet adoption requirement is to submit an application. Most shelters and <br>
        </br>rescues take applications on a first-come basis, so if you see a dog or cat you’re 
        <br></br>interested in, make sure you’re ready to fill out and submit the application quickly.</p>
      </div>

      <div className="paragraph">
        <h2>Home Visit</h2>
        <p>Shelters and rescues may want a specific environment for the cats or dogs that they adopt out. 
          <br></br>A representative of the organization may visit your home to make sure your home is suitable and safe for the pet. 
          <br></br>A larger dog may require a fenced yard or a senior pet may need a home without stairs. 
          Staff will let you know if a home visit is needed before adopting a pet.</p>
      </div>

      <div className="paragraph">
        <h2>Age Requirements</h2>
        <p>Most shelters and rescues will require you to be at least 18 years old to adopt a pet.</p>
      </div>

      <div className="paragraph">
        <h2>Valid Identification</h2>
        <p>In order to verify your age and where you live, you’ll need to provide valid identification to shelter or rescue staff.</p>
      </div>

      <div className="paragraph">
        <h2>Family Meet and Greet</h2>
        <p>It’s a good idea to make sure everyone in the family gets along with the new pet, which is why most shelters and rescues require a family meet-and-greet before adoption. Everyone in the home, including dogs and cats that already live with you, should meet the pet you want to adopt to see if they’ll be a good fit for your family.</p>
      </div>


      <div className="paragraphlast">
        <h2>PawDopt Requirements</h2>
        <p><GoDotFill className='icon'/>Adopter must be at least 18 years of age and have identification.</p>
        <p><GoDotFill className='icon'/>Some members of the household should be present for the adoption.</p>
        <p><GoDotFill className='icon'/>All animals must be indoor house pets.</p>
        <p><GoDotFill className='icon'/>Adopter must be willing to allow an PawDopt representative to make an adoption follow up, either in person, telephone or by gmeet.</p>
        <p><GoDotFill className='icon'/>Spaying/neutering of cats and dogs adopted through any humane organization is a state law and will be enforced by the Department of Agriculture.</p>
        <p><GoDotFill className='icon'/>When adopting a pet from PawDopt, a legally binding and enforced contract must be signed.</p>
        <p><GoDotFill className='icon'/>If at any time, you are unable to keep the pet, or unable to provide it with proper care, you must contact PawDopt first.</p>
        <p><GoDotFill className='icon'/>One week notice may be necessary due to space requirements, but realize that PawDopt may not be able to accept the animal.</p>
        <p><GoDotFill className='icon'/>You must need to be agree that kahit nauwi mo na ang pet we need to visit your home once a week in 1 month to monitor if the pet is surely safe.</p>
      </div>
    </div>
  );
}

export default How;
