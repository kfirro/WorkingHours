import React, {Component} from 'react';
import classes from './Layout.module.css';

class Layout extends Component<{}>{
    render() {
        return <div className={classes.Layout}>
            <h1>Layout</h1>
        </div>
    }
}

export default Layout;