import './App.css';
import BuildForm from './components/BuildForm';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import ViewBuild from './components/ViewBuild';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<BuildForm />} />
      <Route path="/:id" element={<ViewBuild />} />
    </Routes>
    </Router>
  );
}

export default App;
