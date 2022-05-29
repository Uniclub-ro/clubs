import './App.css';
import {useState} from "react";
import React from 'react';

import {
  BrowserRouter as Router, 
  Routes,
  Route
} from 'react-router-dom'

import Home from './Components/Home';
import ContactUs from './Components/ContactUs';
import Signin from './Signin Form/Signin';
import Clubs from './Clubs/Clubs';
import AddClub from './Clubs/AddClub';
import Account from './Account/Account';
import Footer from './Components/Footer';
import AddPost from './Clubs/AddPost';
import AddComment from './Clubs/AddComment';
function App() {
  
  return (
    <div className="App">
       <div>
      <Router>
          <Routes>
            <Route path={'/contactus'} element={<ContactUs />} />
            <Route path={'/signin'} element={<Signin />} />
            <Route path={'/add-club'} element={<AddClub />} />
            <Route path={'/clubs/:id'} element={<Clubs />} />
            <Route path={'/account'} element={<Account />} />
            <Route path={'/footer'} element={<Footer />} />
            <Route path={'/add-post'} element={<AddPost />} />
            <Route path={'/add-comment'} element={<AddComment />} />
            <Route path={'/'} element={<Home />} />
          </Routes>
      </Router>
    </div>
        <p></p>
    </div>
    
  );
}

export default App;
