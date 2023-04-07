import './App.css';
import React from 'react'
import { Route, Routes } from 'react-router-dom';
import SideBar from './components/SideBar/index.js'
import NavBar from './components/NavBar';
import Browser from './components/Browse';
import Songs from './components/Songs';

function App() {
  return (
  <>
    <SideBar />
    <NavBar />
    <Routes>
      <Route path="/" element={<Browser />} />
    </Routes>
    <Routes>
      <Route path="/songs" element={<Songs />} />
    </Routes>
  </>
  );
}

export default App;
