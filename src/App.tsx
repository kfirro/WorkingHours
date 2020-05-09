import React from 'react';
import Header from './hoc/Header';
import LoginContainer from './containers/Login/LoginContainer';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import * as loginService from './services/LoginService';
import Calculator from './containers/Calculator/Calculator';
import classes from './App.module.css';
import UserProvider from './Providers/UserProvider/UserProvider';

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <div className={classes.AppContainer}>
          <Header logoutClicked={loginService.logOut} />
          <Switch>
            <Route exact path="/login" component={LoginContainer} />
            <Route exact path="/workinghours" component={Calculator} />
            <Redirect from="/" to="/login" />
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
