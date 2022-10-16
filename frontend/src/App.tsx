import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login, Register, Dashboard } from './pages';
function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
