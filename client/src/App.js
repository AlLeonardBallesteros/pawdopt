import React from 'react'
import Header from './components/header/Header';
import Routes from './components/routes/Router';
import Footer from './components//footer/Footer';
import './App.css';


function App() {
  return (
    <div className="grid-container">
      <header><Header /></header>
      <main><Routes /></main>
      <footer><Footer /></footer>
    </div>
  )
}

export default App
