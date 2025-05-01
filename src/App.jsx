import './App.css';
import {  BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar'
import Footer from './components/Footer'

import Home from './pages/Home'
import Room from './pages/Room'
import PaymentGateway from './pages/PaymentGetway';
import ChatRoom from './pages/ChatRoom';

import Test from './pages/Test'

function App() {

  return(
    <Router>
      <Navbar />
      <div className="p-4">
        <Routes>

          {/* This is App's Home Page */}
          <Route path="/" element={<Home />} />

          {/* This is App's webRTC Implimentations Page */}
          <Route path="/Room" element={<Room />} />

          {/* This is App's Payment GateWay Page */}
          <Route path="/Payment" element={<PaymentGateway />} />

          {/* This is App's Home ChatRoom Socket.io Page */}
          <Route path="ChatRoom" element={<ChatRoom /> } />

          {/* This is App's Test Page */}
          <Route path="/Test" element={<Test />} />

        </Routes>
      </div>
      <Footer />
    </Router>
  )

}

export default App;
