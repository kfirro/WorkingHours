import React, { FunctionComponent, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Navigation.module.css';
import LogoutLink from './LogoutLink/LogoutLink';
import { UserContext } from '../../../Providers/UserProvider/UserProvider';
import logo from '../../../assets/images/logo192.png';

type NavigationProps = {
    logoutClicked: (e: React.MouseEvent) => void
}


const Navigation: FunctionComponent<NavigationProps> = ({logoutClicked}) => {
    const user = useContext(UserContext).user;
    let logoutClasses = user ? classes.NavLink : [classes.NavLink, classes.Disabled].join(' ');
    return (
        <nav>
            <ul>
                <li style={{ listStyleType: 'none' }}>
                    <img style={{width: '30px',height: '30px',float: 'right',padding: '0px 10px'}} src={logo} alt="logo" />
                    <NavLink to="/workinghours" className={classes.NavLink} activeClassName={classes.ActiveLink}>Calculator</NavLink>
                    <LogoutLink navTo="/" cssClass={logoutClasses} activeCssClass={classes.ActiveLink} clicked={logoutClicked}>Logout</LogoutLink>
                </li>
            </ul>
        </nav>
    );
}
export default Navigation;