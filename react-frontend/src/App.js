import WelcomePage from './components/Welcome';
import Dashboard from './components/Dashboard';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import InitialConfig from './components/InitialConfig';
import RegisterScreen from './components/RegisterScreen';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/config" element={<InitialConfig />} />
          <Route path="/login" element={<RegisterScreen />} />
        </Routes>
      </Router>
  );
}

export default App;
