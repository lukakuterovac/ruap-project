import logo from './logo.svg';
import './App.css';
import Predict from "./pages/Predict";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path="/predict" element={<Predict/>}/>
      </Routes>
    </Router>
  );
}

export default App;
