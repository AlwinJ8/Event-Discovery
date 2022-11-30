import WelcomePage from './components/Welcome';
import Dashboard from './components/Dashboard';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import InitialConfig from './components/InitialConfig';
import RegisterScreen from './components/RegisterScreen';
import MyEvents from './components/MyEvents';
import { Context } from './components/Context';
import React, { useState } from 'react';



function App() {
  const [context, setContext] = useState("default context value");
  return (
    <Context.Provider value={[context, setContext]}>
      <Router>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/config" element={<InitialConfig />} />
            <Route path="/login" element={<RegisterScreen />} />
            <Route path="/my-events" element={<MyEvents />} />
          </Routes>
      </Router>
    </Context.Provider>
  );
}



export default App;
