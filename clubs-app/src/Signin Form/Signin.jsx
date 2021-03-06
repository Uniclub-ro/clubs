import logo from "../img/uniclub.svg";
import './Signin.css';
import { useState, useRef } from "react";
import Header from "../Components/Header";
import { Helmet } from "react-helmet";
import SPORTS from "../Sports/Sports";
import { useNavigate } from "react-router-dom";

export default function Signin({socket, socketId}) {

  const containerRef = useRef();
  const [emailIn, setEmailIn] = useState("");
  const [passwordIn, setPasswordIn] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [usernameUp, setUsernameUp] = useState("");
  const [emailUp, setEmailUp] = useState("");
  const [passwordUp, setPasswordUp] = useState("");
  const [sport, setSport] = useState("football");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const sportsRef = useRef();

  const signInForm = async () => {
    if (emailIn.search("@") === -1 || emailIn.search(".") === -1) {
      setError("Email has not a valid form.")
      return;
    }
    if (emailIn.length < 4 || passwordIn.length < 8) {
      setError("Email or password is too short");
      return;
    }
    const options = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: emailIn,
        password: passwordIn
      })
    };

    const resJSON = await fetch(`${process.env.REACT_APP_URL}:${process.env.REACT_APP_SERVER_PORT}/login`, options);
    const res = await resJSON.json();

    if (await res.error) {
      setError(res.error);
      return;
    }
    
    localStorage.setItem("logged", true);
    localStorage.setItem("id", res["id"]);
    localStorage.setItem("first-name", res["first_name"]);
    localStorage.setItem("last-name", res["last-name"]);
    localStorage.setItem("username", res["username"]);
    localStorage.setItem("email", res["email"]);
    localStorage.setItem("sports", res["sports"]);
    localStorage.setItem("friends", res["friends"]);
    localStorage.setItem("clubs", res["clubs"]);
    
    navigate("/");
  };

  const signUpForm = async () => {
    if (emailUp.search("@") === -1 || emailUp.search(".") === -1) {
      setError("Email has not a valid form.")
      return;
    }
    if (emailUp.length < 4 || passwordUp.length < 8) {
      setError("Email or password is too short");
      return;
    }
    const options = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: emailUp,
        password: passwordUp,
        firstName: firstName,
        lastName: lastName,
        username: usernameUp,
        socket_id: socketId
      })
    };

    const resJSON = await fetch(`${process.env.REACT_APP_URL}:${process.env.REACT_APP_SERVER_PORT}/signup`, options);
    const res = await resJSON.json();

    if (res.error) {
      console.log(res.error);
      setError(res.error);
      return;
    }

    localStorage.setItem("id", await res.id);
    localStorage.setItem("logged", true);
    localStorage.setItem("email", emailUp);
    localStorage.setItem("first-name", firstName);
    localStorage.setItem("last-name", lastName);
    localStorage.setItem("username", usernameUp);
    navigate("/");
   
  };

  return (
    <> 
      <Header socket={socket} socketId={socketId}/>
      <Helmet>
        <script
          src="https://kit.fontawesome.com/64d58efce2.js"
          crossorigin="anonymous"
          async
        ></script>
      </Helmet>
      <div className="container" ref={containerRef}>
      <div className="forms-container">
        <div className="signin-signup">
          <div className="form sign-in-form">
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input 
                type="text" 
                placeholder="Email" 
                value={emailIn} 
                onChange={e => setEmailIn(e.target.value)} 
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" value={passwordIn} onChange={e => setPasswordIn(e.target.value)} />
            </div>
            <input value="Login" className="btn solid" onClick={async () => await signInForm()} />
            
            <div className="errors">
              <p>{error}</p>
            </div>

            
            <p className="social-text">Or Sign in with social platforms</p>
            <div className="social-media">
              <a href="#" className="social-icon">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-google"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
          <div className="form sign-up-form">
            <h2 className="title">Sign up</h2>

            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} />
            </div>

            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} />
            </div>

            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Username" value={usernameUp} onChange={e => setUsernameUp(e.target.value)}/>
            </div>

            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input type="email" placeholder="Email" value={emailUp} onChange={e => setEmailUp(e.target.value)} />
            </div>

            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" value={passwordUp} onChange={e => setPasswordUp(e.target.value)}/>
            </div>

            <div className="preffered-sports">
                <h2>What sports do you like?</h2>
                <div className="sports-container" ref={sportsRef}>
                            {Object.values(SPORTS).map((sport, sportIdx) => {
                                const sportName = Object.keys(SPORTS)[sportIdx];
                                
                               
                                let sportTitle = sportName.replaceAll("_", " ");
                                sportTitle = sportTitle.charAt(0).toUpperCase() + sportTitle.slice(1);
                                
                                return (
                                    <div className={sportIdx !== 0 ? "sport" : "sport active"} onClick={e => {
                                      
                                        sportsRef.current.childNodes[sportIdx].classList.toggle("active");
                                        setSport(currSports => [...currSports, sportName]);
                                    }}>
                                        {sport}
                                        <h3>{sportTitle}</h3>
                                    </div>
                                );
                            })}
                        </div>
            </div>

            

            <div className="errors">
              <p>{error}</p>
            </div>

            <input className="btn" value="Sign up" onClick={async () => await signUpForm()} />
            <p className="social-text">Or Sign up with social platforms</p>
            
            <div className="social-media">
              <a href="#" className="social-icon">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-google"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here ?</h3>
            <p>
            We look forward to showing you how our platform allows you to optimize your lifestyle. Welcome!
            </p>
            <button className="btn transparent" id="sign-up-btn" onClick={() => containerRef.current.classList.add('sign-up-mode')}>
              Sign up
            </button>
          </div>
          <img className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us ?</h3>
            <p>
            We are glad to have you back on our platform to optimize your lifestyle. Welcome back!
            </p>
            <button className="btn transparent" id="sign-in-btn" onClick={() => containerRef.current.classList.remove('sign-up-mode')}>
              Sign in
            </button>
          </div>
          <img className="image" alt="" />
        </div>
      </div>
    </div>
    </>
  );
};

