import logo from "./logo.svg";
import "./App.css";
import Predict from "./pages/Predict";
import Home from "./pages/Home";
import Statistics from "./pages/Statistics";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import './styles.css'; // Import the styles.css file

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path="/predict" element={<Predict/>}/>
        <Route path="/statistics" element={<Statistics/>}/>
      </Routes>
    </Router>
  );
}

export default App;
