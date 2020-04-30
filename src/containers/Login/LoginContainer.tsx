import React, { Component } from 'react';
import Input from '../../components/Form/Input';
import classes from './LoginContainer.module.css';

type LoginContainerState = {

}

export default class LoginContainer extends Component<{}, LoginContainerState>{
    render() {
        return (
            <div className={classes.LoginContainer}>
                <div className={classes.Logo}>Working Hours Calculator</div>
                <div className={classes.LoginItem}>
                    <form className={[classes.form, classes.FormLogin].join(' ')}>
                        <div className={classes.FormField}>
                            <label className={classes.User} htmlFor="login-username"><span className={classes.Hidden}>Username</span></label>
                            <Input id="login-username" type="text" cssClass="form-input" placeHolder="Username" required />
                        </div>
                        <div className={classes.FormField}>
                            <label className={classes.Lock} htmlFor="login-password"><span className={classes.Hidden}>Password</span></label>
                            <Input id="login-password" type="password" cssClass="form-input" placeHolder="Password" required />
                        </div>
                        <div className={[classes.FormField, classes.ButtonWrapper].join(' ')}>
                            <input type="submit" value="Login" />
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}


