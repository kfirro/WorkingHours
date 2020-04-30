import React, { Component } from 'react';
import classes from './Header.module.css';
import Navigation from '../components/Header/Navigation/Navigation';

class Header extends Component<{}>{
    render() {
        return <div className={classes.App}>
            <header className={classes.AppHeader}>
                <Navigation/>
            </header>
        </div>
    }
}

export default Header;