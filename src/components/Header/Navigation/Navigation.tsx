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
    showMenu: boolean
}


const Navigation: React.FC<NavigationProps> = ({ logoutClicked, hideThumbnail, showMenu }) => {
    const user = useContext(UserContext).user;
    let logoutClasses = user ? classes.NavLink : [classes.NavLink, classes.Disabled].join(' ');
    let hideThumbnailClass = hideThumbnail ? classes.HideLogoThumbMobile : undefined;
    // let menu = showMenu ? <>
    //     <li>
    //         <NavLink to="/workinghours" className={classes.NavLink} activeClassName={classes.ActiveLink}>Calculator</NavLink>
    //     </li>                
    //     <li>
    //         <LogoutLink navTo="/" cssClass={logoutClasses} activeCssClass={classes.ActiveLink} clicked={logoutClicked}>Logout</LogoutLink>
    //     </li>
    // </> : undefined;
    let menu = showMenu ?
        <li style={{marginLeft: 'auto'}}>
            <LogoutLink navTo="/" cssClass={logoutClasses} activeCssClass={classes.ActiveLink} clicked={logoutClicked}><FontAwesomeIcon icon={faSignOutAlt}/></LogoutLink>
        </li>
        : undefined;
    return (
        <nav>
            <ul style={{ listStyleType: 'none', display: 'flex', margin: '0', padding: '0' }}>
                <li style={{ order: 0 }}>
                    <img className={hideThumbnailClass} style={{ width: '30px', height: '30px', padding: '0px 10px' }} src={logo} alt="logo" />
                </li>
                {menu}
            </ul>
        </nav>
    );
}
export default Navigation;