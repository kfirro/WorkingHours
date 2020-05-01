import React, { FunctionComponent } from 'react';
import { NavLink } from 'react-router-dom';

export type LogOutLinkProps = {
    clicked: (e: React.MouseEvent) => void
    navTo: string,
    children: React.ReactNode,
    cssClass?: string,
    activeCssClass?: string,
}

const LogOutLink: FunctionComponent<LogOutLinkProps> = ({clicked,navTo,cssClass,activeCssClass,children}) => {
    return (
        <NavLink to={navTo} className={cssClass} onClick={clicked}>{children}</NavLink>
    );
}
export default LogOutLink;