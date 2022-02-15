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
  // const [users, setUsers] = useState([]);
  const [auth, setAuth] = useState(null);
  const [currentUser, setCurrentUser] = useState({});

  // useEffect(() => {
  //   // Address should be replaced with FQDN of application and taken from ENV
  //   const domain = process.env.REACT_APP_DOMAIN;
  //   const http = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  //   fetch(`${http}://${domain}/users`, {
  //     headers: {
  //       'Access-Control-Allow-Origin': '*',
  //       'Content-Type': 'application/json',
  //       Accept: 'application/json'
  //     }
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setUsers(data);
  //     }).catch((err) => console.log(err));
  // }, []);

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