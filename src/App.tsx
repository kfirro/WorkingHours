import React from 'react';
import logo from './logo.svg';
import classes from './App.module.css';
import Layout from './hoc/Layout';

function App() {
  return (
    <>
      <Layout />
      <div className={classes.App}>
        <header className={classes.AppHeader}>
          <img src={logo} className={classes.AppLogo} alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
        </p>
          <a
            className={classes.AppLink}
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
        </a>
        </header>
      </div>
    </>
  );
}

export default App;
