import React, { Component } from 'react';
import classes from './Header.module.css';
import Navigation from '../components/Header/Navigation/Navigation';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from "react-router";

type PathParamsType = {
    param1: string,
}

type HeaderProps = RouteComponentProps<PathParamsType> & {
    logoutClicked: (e: React.MouseEvent) => void
}

class Header extends Component<HeaderProps>{
    componentDidMount(){
        console.log(this.props);
    }
    componentDidUpdate(){
        console.log(this.props);
    }
    render() {
        let hideThumbnail = this.props.location.pathname === "/login";
        return <header className={classes.AppHeader}>
                <Navigation logoutClicked={this.props.logoutClicked} hideThumbnail={hideThumbnail}/>
            </header>        
    }
}

export default withRouter(Header);