import React, { Component } from 'react';
import classes from './LoginContainer.module.css';
import * as loginService from '../../services/LoginService';

type LoginContainerState = {
    email: string,
    password: string,
    error: string
}

export default class LoginContainer extends Component<{}, LoginContainerState>{
    state: LoginContainerState = {
        email: "",
        password: "",
        error: ""
    }
    handleLoginClicked = async (e: React.MouseEvent<HTMLInputElement,MouseEvent>, email: string, password: string) => {
        e.preventDefault();
        e.stopPropagation();
        const res = await loginService.logIn(email,password);
        if(res && res === "OK")
            window.location.href = "/workinghours";
        else{
            this.setState({error: res});
        }        
    }
    onEmailChanged = (e: any) => {
        this.setState({email: e.target.value});
    }
    onPasswordChanged = (e: any) => {
        this.setState({password: e.target.value});
    }
    render() {
        let errorDiv = this.state.error ? <div className={classes.Error}><h4>{this.state.error}</h4></div> : null;
        return (
            <div className={classes.LoginContainer}>
                <div className={classes.Logo}>Working Hours Calculator</div>
                <div className={classes.LoginItem}>
                    <form className={[classes.form, classes.FormLogin].join(' ')}>
                        <div className={classes.FormField}>
                            <label className={classes.User} htmlFor="login-username"><span className={classes.Hidden}>Username</span></label>
                            <input id="login-username" type="text" className="form-input" placeholder="Username" required onChange={(e) => this.onEmailChanged(e)}/>
                        </div>
                        <div className={classes.FormField}>
                            <label className={classes.Lock} htmlFor="login-password"><span className={classes.Hidden}>Password</span></label>
                            <input id="login-password" type="password" className="form-input" placeholder="Password" required onChange={(e) => this.onPasswordChanged(e)}/>
                        </div>
                        <div className={[classes.FormField, classes.ButtonWrapper].join(' ')}>
                            <input type="submit" value="Login" onClick={(e) => this.handleLoginClicked(e,this.state.email,this.state.password)}/>
                        </div>
                    </form>
                </div>
                {errorDiv}
            </div>
        );
    }
}


