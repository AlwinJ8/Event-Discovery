import React from 'react';
import '../App.css';
import logo from '../images/GT_logo.png';
import {useNavigate} from "react-router-dom"
  
  
function Welcome () {
    const navigate = useNavigate();

    /*const buttonClick = () => {
      const url = 'http://localhost:3000/#/newuser'
      window.open(url)
    };*/
        return (
          <div className="App">
            <header className="App-header">
              <img src={logo} className="GT-logo" alt="GT logo"  />
              <p>
                Welcome to Campus Discovery!
              </p>
              <button
                className='Start-button'
                onClick={()=>navigate("/newuser")}
              >
                Login
              </button>
            </header>
          </div>
        );
}

export default Welcome