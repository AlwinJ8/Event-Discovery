import React, {useState}  from 'react';
import '../InitialConfig.css';
import Logo from "../images/GT_logo.png";
import {Route, Router, useNavigate, useParams} from "react-router-dom"



function InitialConfig()  {
      const header = useParams()
      console.log(header)
      const navigate = useNavigate();
      const [persontype, setPersonType] = useState();
      const handleTypeChange = (event) => {
        setPersonType(event.target.value);
      };

      const [userName, setUserName] = useState("");
      const handleUserChange = (event) => {
        setUserName(event.target.value);
      };

      const handleSubmit = (event) => {
        if (userName == '') {
            alert("Please enter a name")
        } else {
            navigate("/dashboard")
        }
        event.preventDefault();
      }
    
      return (
          <div className="App">
          <header className="App-header">
            <img src={Logo} className="GT-logo" alt="GT logo"  />
            <p>
              Please Make an Account!
            </p>
            <form onSubmit={handleSubmit}>
          <label>
            You are a: 
              <select value = {persontype} name = 'persontype' onChange={handleTypeChange}>
                  <option persontype="Student">Student</option>
                  <option persontype="Admin">Admin</option>
                  <option persontype="Teacher">Teacher</option>
              </select>
          </label>    
          <br />
          <label>
              Full Name:
              <textarea value={userName} name = 'userName' onChange={handleUserChange} />
          </label>
          <br />
          <input type = "submit" value = "Submit" />
        </form>
          </header>
        </div>
          
        );
      }

export default InitialConfig