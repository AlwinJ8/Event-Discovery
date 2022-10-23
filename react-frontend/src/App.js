import WelcomePage from './components/Welcome';
import Dashboard from './components/Dashboard';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import InitialConfig from './components/InitialConfig';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/config" element={<InitialConfig />} />
        </Routes>
      </Router>
  );
}

export default App;
