import React, {useState}  from 'react';
import '../InitialConfig.css';
import Logo from "../images/GT_logo.png";
import {Route, Router, useLocation, useNavigate, useParams} from "react-router-dom"
import { useContext } from 'react';
import {Context} from './Context';
import UserServices from '../services/UserServices';

function InitialConfig() {
  const navigate = useNavigate();
  const [persontype, setPersonType] = useState("Student");
  const [context, setContext] = useContext(Context);
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
          UserServices.addUser(context, userName, persontype);
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