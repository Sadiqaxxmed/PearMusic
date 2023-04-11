import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import './App.css';
import SideBar from './components/SideBar/index.js'
import NavBar from './components/NavBar';
import Browser from './components/Browse';
import Songs from './components/Songs';
import AllPlaylist from './components/AllPlaylist';
import SinglePlaylist from "./components/SinglePlaylist";
import Albums from "./components/Albums";
import ManageDiscography from "./components/Manage-Discography";
import ScrollToTop from './components/ScrollToTop.js'


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
        <ScrollToTop/>
        <SideBar />
        <NavBar isLoaded={isLoaded} />
        <Navigation />
      {isLoaded && (
        <Switch>
          
          {/* <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route> */}
          <Route exact path="/">
            <Browser />
          </Route>
          <Route path="/songs">
            <Songs />
          </Route>
          <Route path="/allPlaylist">
            <AllPlaylist />
          </Route>
          <Route path="/SinglePlaylist">
            <SinglePlaylist />
          </Route>
          <Route path="/albums">
            <Albums />
          </Route>
          <Route path="/manage-discography">
            <ManageDiscography />
          </Route>
        </Switch>
      )}
    </>
  );

}

export default App;
