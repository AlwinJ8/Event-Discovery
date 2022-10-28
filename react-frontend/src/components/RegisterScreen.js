import React, { useEffect, useState, useRef } from 'react';
import '../InitialConfig.css';
import Logo from "../images/GT_logo.png";
import { useNavigate } from "react-router-dom"
import UserServices from '../services/UserServices';


function RegisterScreen() {
  const navigate = useNavigate();
  const [gtID, setgtID] = useState("")
  const [valid, setValid] = useState("")
  const handleIDChange = (event) => {
    setgtID(event.target.value);
  };
  const didMount = useRef(false)

  async function fetchData() {
    UserServices.validateUser(gtID)
      .then((response) => response.data)
      .then((data) => setValid(data.exists))
  }

  useEffect( () => {
    fetchData();
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();
    if (gtID == '' || gtID.length != 9 || isNaN(+gtID)) {
      alert("Please enter a valid GTID")
    } else {
      fetchData();
      if (valid) {
        navigate("/dashboard")
      } else {
        navigate("/config")
      }
      
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={Logo} className="GT-logo" alt="GT logo" />
        <p>
          Welcome to Campus Discovery!
        </p>
        <form onSubmit={handleSubmit}>
          <label>
            Please Enter Your GTID:
            <textarea value={gtID} name='gtID' onChange={handleIDChange} />
          </label>
          <br />
          <input type="submit" value="Submit" />
        </form>
      </header>
    </div>
  );
}

export default RegisterScreen