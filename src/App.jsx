import './App.css';
import {  BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/WebRTC/Navbar'
import Footer from './components/WebRTC/Footer'
import Home from './pages/Home'
import Room from './pages/Room'
import Test from './pages/Test'


function App() {
  return(
    <Router>
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/room" element={<Room />} />
          <Route path="/Test" element={<Test />} />
          
        </Routes>
      </div>
      <Footer />
    </Router>
  )

}

export default App;
