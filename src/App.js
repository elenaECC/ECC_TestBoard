import React, { useState, useEffect } from 'react';
import {Route, BrowserRouter as Router} from "react-router-dom";
import './App.scss';
import ReactGA from "react-ga"
import axios from "axios"

import {ZaddrContext} from "./contexts/ZaddrContext"
import {UserContext} from "./contexts/UserContext"

import Signup from "./components/Signup"
import Login from "./components/Login"
import ZaddrList from "./components/ZaddrList";
import Navigation from "./components/Navigation";
import EditUserInfo from "./components/EditUserInfo";
import About from "./components/About"

function App() {
  const [zaddrs, setZaddrs] = useState([]);
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("jwt") ? true : false)
  const [ip, setIp] = useState("");
  useEffect( _ => {
    ReactGA.initialize("UA-156199574-2");
    ReactGA.pageview("/");
    ReactGA.event({category: "App", action: "Loaded app"});
  })
  useEffect( _ => {
    axios.get('https://www.cloudflare.com/cdn-cgi/trace')
      .then(res => setIp(res.data.split("\n")[2].replace("ip=","")))
      .catch(err => console.log(err))
  }, [])


  return (
    <UserContext.Provider value={{loggedIn, setLoggedIn, ip}}>
      <ZaddrContext.Provider value={{zaddrs, setZaddrs}}>
        <Router>
          <div className="App">
            <Navigation />
            <Route exact path="/" render={() => <ZaddrList />} />
            <Route exact path="/signup" render={(props) => <Signup {...props} />} />
            <Route exact path="/login" render={(props) => <Login {...props} />} />
            <Route path="/edit" render={(props) => <EditUserInfo {...props} /> } />
            <Route path="/about" render={(props) => <About {...props} /> } />
          </div>
        </Router>
      </ZaddrContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
