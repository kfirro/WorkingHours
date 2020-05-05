import React, { Component } from 'react';
import classes from './Header.module.css';
import Navigation from '../components/Header/Navigation/Navigation';

type HeaderProps = {
    logoutClicked: (e: React.MouseEvent) => void
}

class Header extends Component<HeaderProps>{
    render() {
        return <header className={classes.AppHeader}>
                <Navigation logoutClicked={this.props.logoutClicked} />
            </header>        
    }
}

export default Header;