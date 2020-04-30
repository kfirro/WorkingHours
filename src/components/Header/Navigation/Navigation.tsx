import React, { FunctionComponent } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Navigation.module.css';

const Navigation: FunctionComponent<{}> = () => {
    return (
        <nav>
            <ul>
                <li style={{ listStyleType: 'none' }}>
                    <NavLink to="/login" className={classes.NavLink} activeClassName={classes.ActiveLink}>Login</NavLink>
                    <NavLink to="/workinghours" className={classes.NavLink} activeClassName={classes.ActiveLink}>Calculator</NavLink>
                </li>
            </ul>
        </nav>
    );
}
export default Navigation;