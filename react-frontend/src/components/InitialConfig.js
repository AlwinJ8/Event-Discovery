import React, { useState}  from 'react';
import '../InitialConfig.css';
import Logo from "../images/GT_logo.png";


function InitialConfig()  {
      //this.state = {personType: 'Student', userName: ''};
      const [personType, setPersonType] = useState("Student");
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
            const url = 'http://localhost:3000/#/dashboard'
            window.open(url)
        }
        event.preventDefault();
      }
    
      return (
          <div className="App">
          <header className="App-header">
            <img src={Logo} className="GT-logo" alt="GT logo"  />
            <p>
              Welcome to Campus Discovery!
            </p>
            <form onSubmit={handleSubmit}>
          <label>
            You are a: 
              <select value = {personType} name = 'personType' onChange={handleTypeChange}>
                  <option personType="Student">Student</option>
                  <option personType="Teacher">Teacher</option>
                  <option personType="Organizer">Organizer</option>
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