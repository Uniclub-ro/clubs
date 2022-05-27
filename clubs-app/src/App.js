import './App.css';
import {useState} from "react";
import React from 'react';

import {
  BrowserRouter as Router, 
  Routes,
  Route
} from 'react-router-dom'

import Home from './Components/Home';
import AboutUs from './Components/AboutUs';
import ContactUs from './Components/ContactUs';
import Signin from './Aterizare/Signin';

function App() {
  
  return (
    <div className="App">

       <div>
      <Router>
          <Routes>
            <Route path={'/AboutUs'} element={<AboutUs />} />
            <Route path={'/ContactUs'} element={<ContactUs />} />
            <Route path={'/signin'} element={<Signin />} />
            <Route path={'/'} element={<Home />} />
          </Routes>
      </Router>
    </div>
        <p></p>

    </div>
  );
}

export default App;
