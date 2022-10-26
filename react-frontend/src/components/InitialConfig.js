import React, { useState}  from 'react';
import '../InitialConfig.css';
import Logo from "../images/GT_logo.png";


class InitialConfig extends React.Component {

    constructor(props) {
        super(props);
        this.state = {personType: 'Student', userName: ''};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
      }
    
      handleSubmit(event) {
        if (this.state.userName == '' || this.state.userName == null || /\s/.test(this.state.userName)) {
            alert("Please enter a name")
        } else {
            const url = 'http://localhost:3000/#/dashboard'
            window.open(url)
        }
        event.preventDefault();
      }
    
      render() {
        return (
            <div className="App">
            <header className="App-header">
              <img src={Logo} className="GT-logo" alt="GT logo"  />
              <p>
                Welcome to Campus Discovery!
              </p>
              <form onSubmit={this.handleSubmit}>
            <label>
              You are a: 
                <select personType={this.state.personType} name = 'personType' onChange={this.handleChange}>
                    <option personType="Student">Student</option>
                    <option personType="Teacher">Teacher</option>
                    <option personType="Organizer">Organizer</option>
                </select>
            </label>    
            <br />
            <label>
                Full Name:
                <textarea userName={this.state.userName} name = 'userName' onChange={this.handleChange} />
            </label>
            <br />
            <input type = "submit" value = "Submit" />
          </form>
            </header>
          </div>
          
        );
      }
    }
export default InitialConfig