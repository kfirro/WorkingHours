import React, { Component, createContext } from 'react';
import { auth } from '../../index';

type UserContextProps = {
  user: firebase.User | null
}
export const UserContext = createContext<UserContextProps>({ user: null });

type UserProviderState = {
  user: firebase.User | null
}
type UserProviderProps = {
  children: React.ReactNode
}

class UserProvider extends Component<UserProviderProps, UserProviderState> {
  state: UserProviderState = {
    user: null
  };
  _onAuthStateChangedWasSet = false;

  componentDidMount() {
    if (!this._onAuthStateChangedWasSet) {
      auth.onAuthStateChanged(userAuth => {
        this.setState({ user: userAuth });
      });
      this._onAuthStateChangedWasSet = true;
    }
  }

  render() {
    return (
      <UserContext.Provider value={{ user: this.state.user }}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
export default UserProvider;