import React, { useState } from 'react';
import * as Components from './Components';
import { StyleSheetManager } from 'styled-components';
import bgjoinus from '../assets/bg-join-us.png'
import './pagescss/JoinUs.css';
import axios from "axios"
import { useNavigate } from 'react-router-dom'

function JoinUs() {
  const [signIn, toggle] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone_no, setPhonenumber] = useState('');
  const [address, setAddress] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8000/signin', {
        name: name,
        email: email,
        password: password,
      });

      if (response.data.code === 200) {
        localStorage.setItem('TOKEN', response.data.token);
        localStorage.setItem('EMAIL', response.data.email);
        alert('Login success.');
        navigate('/available-to-adopt'); // Navigate to the desired page
      } else {
        alert('User not found or password is wrong.');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:8000/signup', {
        email: email,
        password: password,
        name: name,
        phone_no: phone_no,
        address: address,
      });

      if (response.data.code === 200) {
        alert('Signup success.');
      } else {
        alert('Error during signup.');
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };  

  return (
    <div className="join-us" style={{ 
      backgroundImage: `url(${bgjoinus})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',}}>
      <StyleSheetManager shouldForwardProp={(prop) => prop !== 'signinin'}>
        <Components.Container>
          <Components.SignUpContainer signinin={signIn}>
            <Components.Form>
              <Components.Title>Sign Up</Components.Title>
              <Components.Input type="text" 
                                placeholder="Name" 
                                value={name}
                                onChange={(e) => setName(e.target.value)}/>
              <Components.Input type="email" 
                                placeholder="Email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}/>
              <Components.Input type="password" 
                                placeholder="Password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}/>
              <Components.Input type="tel" 
                                placeholder="Phone Number" 
                                value={phone_no}
                                onChange={(e) => setPhonenumber(e.target.value)}/>
              <Components.Input type="address" 
                                placeholder="Address" 
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}/>
              <Components.Button onClick={handleSignup}>Sign Up</Components.Button>
            </Components.Form>
          </Components.SignUpContainer>

          <Components.SignInContainer signinin={signIn}>
            <Components.Form>
              <Components.Title>Sign In
              </Components.Title>
              <Components.Input type="name" 
                                placeholder="Name" 
                                name="name" 
                                id="name" 
                                value={name}
                                onChange={(e) => setName(e.target.value)}/>
              <Components.Input type="email" 
                                placeholder="Email" 
                                name="email" 
                                id="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}/>
              <Components.Input type="password" 
                                placeholder="Password" 
                                name="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}/>
              <Components.Anchor href="/forgot-password">Forgot your password?</Components.Anchor>
              <Components.Button onClick={handleLogin}>Sign In</Components.Button>
            </Components.Form>
          </Components.SignInContainer>

          <Components.OverlayContainer signinin={signIn}>
            <Components.Overlay signinin={signIn}>
              <Components.LeftOverlayPanel signinin={signIn}>
                <Components.Title>Welcome to PawDopt</Components.Title>
                <Components.Paragraph>
                  Already have an account? Click Sign In to Log In
                </Components.Paragraph>
                <Components.GhostButton onClick={() => toggle(true)}>
                  Sign In
                </Components.GhostButton>
              </Components.LeftOverlayPanel>

              <Components.RightOverlayPanel signinin={signIn}>
                <Components.Title>Welcome Back, Furparent!</Components.Title>
                <Components.Paragraph>
                  Don't have an account yet? Click Sign Up to Register
                </Components.Paragraph>
                <Components.GhostButton onClick={() => toggle(false)}>
                  Sign Up
                </Components.GhostButton>
              </Components.RightOverlayPanel>
            </Components.Overlay>
          </Components.OverlayContainer>
        </Components.Container>
      </StyleSheetManager>
    </div>
  );
}

export default JoinUs;
