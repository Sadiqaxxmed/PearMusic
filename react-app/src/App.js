import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import './App.css';
import SideBar from './components/SideBar/index.js'
import NavBar from './components/NavBar';
import SplashPage from "./components/SplashPage";
import Browser from './components/Browse';
import Songs from './components/Songs';
import AllPlaylist from './components/AllPlaylist';
import SinglePlaylist from "./components/SinglePlaylist";
import Albums from "./components/Albums";
import ManageDiscography from "./components/Manage-Discography";
import ScrollToTop from './components/ScrollToTop.js'
import ExploreGenre from "./components/ExploreGenre";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Switch>
        {isLoaded && <Route exact path='/' component={SplashPage} />}
        {isLoaded && (
          <>
            <ScrollToTop />
            <SideBar />
            <NavBar isLoaded={isLoaded} />
            <Navigation />

            <Route exact path="/browse">
              <Browser />
            </Route>
            <Route path="/songs">
              <Songs />
            </Route>
            <Route path="/allPlaylist">
              <AllPlaylist />
            </Route>
            <Route path="/SinglePlaylist/:playlist_id">
              <SinglePlaylist />
            </Route>
            <Route path="/albums">
              <Albums />
            </Route>
            <Route path="/manage-discography">
              <ManageDiscography />
            </Route>
            <Route path="/explore/:genre_type">
              <ExploreGenre />
            </Route>
          </>
        )}
      </Switch>
    </>
  )
  // return (
  //   <>
  //     <ScrollToTop />
  //     <SideBar />
  //     <NavBar isLoaded={isLoaded} />
  //     <Navigation />
  //     {isLoaded && (
  //       <Switch>

  //         {/* <Route path="/login" >
  //           <LoginFormPage />
  //         </Route>
  //         <Route path="/signup">
  //           <SignupFormPage />
  //         </Route> */}
  //         <Route exact path="/browse">
  //           <Browser />
  //         </Route>
  //         <Route path="/songs">
  //           <Songs />
  //         </Route>
  //         <Route path="/allPlaylist">
  //           <AllPlaylist />
  //         </Route>
  //         <Route path="/SinglePlaylist/:playlist_id">
  //           <SinglePlaylist />
  //         </Route>
  //         <Route path="/albums">
  //           <Albums />
  //         </Route>
  //         <Route path="/manage-discography">
  //           <ManageDiscography />
  //         </Route>
  //         <Route path="/explore/:genre_type">
  //           <ExploreGenre />
  //         </Route>
  //       </Switch>
  //     )}
  //   </>
  // );

}

export default App;
