import React from 'react';
import '../App.css';
import logo from '../images/GT_logo.png';
import {useNavigate} from "react-router-dom"
  
  
function Welcome () {
    const navigate = useNavigate();
    
        return (
          <div className="App">
            <header className="App-header">
              <img src={logo} className="GT-logo" alt="GT logo"/>
              <p>
                Welcome to Campus Discovery!
              </p>
              <button
                className='Start-button'
                onClick={()=>navigate("/login")}
              >
                Login
              </button>
            </header>
          </div>
        );
}

export default Welcome