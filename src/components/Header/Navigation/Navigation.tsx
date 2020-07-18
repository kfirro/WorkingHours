import React, { useContext } from 'react';
// import { NavLink } from 'react-router-dom';
import classes from './Navigation.module.css';
import LogoutLink from './LogoutLink/LogoutLink';
import { UserContext } from '../../../Providers/UserProvider/UserProvider';
import logo from '../../../assets/images/logo192.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

type NavigationProps = {
    logoutClicked: (e: React.MouseEvent) => void,
    hideThumbnail: boolean,
    showMenu: boolean,
    thumbnailClicked: (e: React.MouseEvent) => void,
}


const Navigation: React.FC<NavigationProps> = ({ logoutClicked, hideThumbnail, showMenu, thumbnailClicked }) => {
    const user = useContext(UserContext).user;
    let greetingElement = user ? <li style={{ textTransform: 'capitalize' }}>{user.displayName ?? user.email ?? "N/A"}</li> : undefined;
    let logoutClasses = user ? classes.NavLink : [classes.NavLink, classes.Disabled].join(' ');
    let hideThumbnailClass = hideThumbnail ? classes.HideLogoThumbMobile : undefined;
    let menu = showMenu ?
        <React.Fragment>
            {greetingElement}
            <li style={{marginLeft: 'auto'}}>
                <LogoutLink navTo="/" cssClass={logoutClasses} activeCssClass={classes.ActiveLink} clicked={logoutClicked}><FontAwesomeIcon size={"2x"} icon={faSignOutAlt}/></LogoutLink>
            </li>
        </React.Fragment>
        : undefined;
    return (
        <nav className={classes.NavigationNavElement}>
            <ul style={{ listStyleType: 'none', display: 'flex', margin: '0', padding: '0', alignItems: 'center'}}>
                <li style={{ order: 0 }}>
                    <img className={hideThumbnailClass} style={{ width: '30px', height: '30px', padding: '0px 10px' }} src={logo} alt="logo" onClick={(e) => thumbnailClicked(e)}/>
                </li>
                {menu}
            </ul>
        </nav>
    );
}
export default Navigation;