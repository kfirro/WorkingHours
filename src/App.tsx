import React from 'react';
import Header from './hoc/Header';
import LoginContainer from './containers/Login/LoginContainer';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import * as loginService from './services/LoginService';
import Calculator from './containers/Calculator/Calculator';
import classes from './App.module.css';
import UserProvider from './Providers/UserProvider/UserProvider';

type AppProps = {

}
type AppState = {
  sideBar: boolean
}
class App extends React.Component<AppProps,AppState> {

  state = {
    sideBar: false
  }
  toggleSideBar = () => {
    this.setState(prevState => ({
      sideBar: !prevState.sideBar
    }));
  }

  render() {
    return (
    <UserProvider>
      <BrowserRouter>
        <div className={classes.AppContainer}>
          <Header logoutClicked={loginService.logOut} thumbnailClicked={this.toggleSideBar}/>
            <Switch>
              <Route exact path="/login" component={LoginContainer} />
              <Route exact path="/workinghours" render={ (props) => <Calculator {...props} openSideBar={this.state.sideBar} />} />
              <Redirect from="/" to="/login" />
            </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    </UserProvider>
    );
  }
}

export default App;
