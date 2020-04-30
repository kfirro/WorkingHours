import React from 'react';
import Header from './hoc/Header';
import LoginContainer from './containers/Login/LoginContainer';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Switch>
        <Route exact path="/login" component={LoginContainer}/>
        <Route exact path="/workinghours" component={LoginContainer}/>
        <Redirect from="/" to="/login"/>
      </Switch>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
