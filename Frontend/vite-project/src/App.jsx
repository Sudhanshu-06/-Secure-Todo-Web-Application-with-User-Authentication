import React from 'react'
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import {Route,Routes} from "react-router-dom";
import PageNotFound from './components/pageNotFound';
function App() {
  return (
    <div>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<PageNotFound />} />
      </Routes>
      {/* <Home />
      <Login/>
      <Signup /> */}
      
    </div>
  )
}

export default App