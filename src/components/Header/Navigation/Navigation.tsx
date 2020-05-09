import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Navigation.module.css';
import LogoutLink from './LogoutLink/LogoutLink';
import { UserContext } from '../../../Providers/UserProvider/UserProvider';
import logo from '../../../assets/images/logo192.png';

type NavigationProps = {
    logoutClicked: (e: React.MouseEvent) => void,
    hideThumbnail: boolean
}


const Navigation: React.FC<NavigationProps> = ({logoutClicked, hideThumbnail}) => {
    const user = useContext(UserContext).user;
    let logoutClasses = user ? classes.NavLink : [classes.NavLink, classes.Disabled].join(' ');
    let hideThumbnailClass = hideThumbnail ? classes.HideLogoThumbMobile : undefined;
    return (
        <nav>
            <ul style={{ listStyleType: 'none', display: 'flex' }}>
                <li>                    
                    <NavLink to="/workinghours" className={classes.NavLink} activeClassName={classes.ActiveLink}>Calculator</NavLink>                    
                </li>
                <li>
                    <LogoutLink navTo="/" cssClass={logoutClasses} activeCssClass={classes.ActiveLink} clicked={logoutClicked}>Logout</LogoutLink>
                </li>
                <li style={{marginLeft: 'auto'}}>
                    <img className={hideThumbnailClass} style={{width: '30px',height: '30px',padding: '0px 10px'}} src={logo} alt="logo" />
                </li>
            </ul>
        </nav>
    );
}
export default Navigation;