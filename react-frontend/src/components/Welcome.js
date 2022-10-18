import React from 'react';
import '../App.css';
import logo from '../images/GT_logo.png';

class Welcome extends React.Component {
    buttonClick = () => {
      const url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
      window.open(url)
    };

    render() {
        return (
          <div className="App">
            <header className="App-header">
              <img src={logo} className="GT-logo" alt="GT logo"  />
              <p>
                Welcome to Campus Discovery!
              </p>
              <button
                className='Start-button'
                onClick={this.buttonClick}
              >
                Login
              </button>
            </header>
          </div>
        );
    }
}

export default Welcome