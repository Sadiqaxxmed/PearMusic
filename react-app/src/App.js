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
import NotFound from "./components/NotFound";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ScrollToTop />

      <Switch>
        <Route exact path="/" component={SplashPage} />

        <Route path="/">
          {isLoaded && (
            <>
              <SideBar />
              <NavBar isLoaded={isLoaded} />
              <Navigation />
            </>
          )}

          <Switch>
            <Route exact path="/browse" component={Browser} />
            <Route path="/songs" component={Songs} />
            <Route path="/allPlaylist" component={AllPlaylist} />
            <Route path="/SinglePlaylist/:playlist_id" component={SinglePlaylist} />
            <Route path="/albums" component={Albums} />
            <Route path="/manage-discography" component={ManageDiscography} />
            <Route path="/explore/:genre_type" component={ExploreGenre} />

            <Route component={NotFound} />
          </Switch>
        </Route>
      </Switch>
    </>
  );
}

export default App;