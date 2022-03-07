import React, { useState } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import LandingPage from "../src/screens/landingPage/LandingPage";
import Login from "../src/screens/login/Login";
import Register from "../src/screens/register/Register";
import Details from "../src/screens/details/Details";
import HomePage from "../src/screens/homePage/HomePage";
import Profile from "../src/screens/profile/Profile";
import "./App.css";


const App = () => {
  const [auth, setAuth] = useState(null);
  const [currentUser, setCurrentUser] = useState({});

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route exact path="/login">
            <Login setAuth={setAuth} />
          </Route>
          <Route exact path="/register">
            <Register setAuth={setAuth} />
          </Route>
          <Route
            exact
            path="/details"
            render={() => (
              <Details
                auth={auth}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            )}
          />
          <Route
            exact
            path="/home"
            render={() => (
              <HomePage
                auth={auth}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            )}
          />
          <Route
            exact
            path="/profile/:id"
            render={() => (
              <Profile
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            )}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;