import React, { useState}  from 'react';
import '../InitialConfig.css';
import Logo from "../images/GT_logo.png";


function RegisterScreen()  {
      //this.state = {personType: 'Student', userName: ''};
      const [gtID, setgtID] = useState("");
      const handleIDChange = (event) => {
        setgtID(event.target.value);
      };

      const handleSubmit = (event) => {
        if (gtID == '') {
            alert("Please enter a name")
        } else {
            const url = 'http://localhost:3000/#/config'
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
              Please Enter Your GTID:
              <textarea value={gtID} name = 'gtID' onChange={handleIDChange} />
          </label>
          <br />
          <input type = "submit" value = "Submit" />
        </form>
          </header>
        </div>
          
        );
      }

export default RegisterScreen