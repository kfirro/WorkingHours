import React, { FunctionComponent } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Navigation.module.css';
import LogoutLink from './LogoutLink/LogoutLink';
import * as loginService from '../../../services/LoginService';

type NavigationProps = {
    logoutClicked: (e: React.MouseEvent) => void
}


const Navigation: FunctionComponent<NavigationProps> = ({logoutClicked}) => {
    let logoutClasses = loginService.isLoggedIn() ? classes.NavLink : [classes.NavLink, classes.Disabled].join(' ');
    return (
        <nav>
            <ul>
                <li style={{ listStyleType: 'none' }}>
                    {/* <NavLink to="/login" className={classes.NavLink} activeClassName={classes.ActiveLink}>Login</NavLink> */}
                    <NavLink to="/workinghours" className={classes.NavLink} activeClassName={classes.ActiveLink}>Calculator</NavLink>
                    <LogoutLink navTo="/" cssClass={logoutClasses} activeCssClass={classes.ActiveLink} clicked={logoutClicked}>Logout</LogoutLink>
                </li>
            </ul>
        </nav>
    );
}
export default Navigation;