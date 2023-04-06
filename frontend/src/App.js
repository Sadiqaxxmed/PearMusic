import './App.css';
import React from 'react'
import SideBar from './components/SideBar/index.js'
import NavBar from './components/NavBar';
import Browser from './components/Browse';
import { Route } from 'react-router-dom';

function App() {
  return (
      <>
        <SideBar />
        <NavBar />
        <Browser />
    </>
  );
}

export default App;
