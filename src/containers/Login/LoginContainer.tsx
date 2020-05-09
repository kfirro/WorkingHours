import React, { Component } from 'react';
import classes from './LoginContainer.module.css';
import * as loginService from '../../services/LoginService';
import { UserContext } from '../../Providers/UserProvider/UserProvider';
import { Redirect } from 'react-router-dom';
import logo from '../../assets/images/logo512.png';

type LoginContainerState = {
    email: string,
    password: string,
    error: string,
    showCredentials: boolean
}

export default class LoginContainer extends Component<{}, LoginContainerState>{
    static contextType = UserContext;
    context!: React.ContextType<typeof UserContext>;

    state: LoginContainerState = {
        email: "",
        password: "",
        error: "",
        showCredentials: false
    }
    handleLoginClicked = async (e: React.MouseEvent<HTMLInputElement, MouseEvent>, email: string, password: string) => {
        e.preventDefault();
        e.stopPropagation();
        const res = await loginService.logIn(email, password);
        if (res && res !== "OK")
            this.setState({ error: res });
    }
    handleLoginWithGmailClicked = async (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        e.preventDefault();
        e.stopPropagation();
        const res = await loginService.loginWithGmail();
        if (res && res !== "OK")
            this.setState({ error: res });
    }
    setShowCredentials = async (e: React.MouseEvent<HTMLInputElement, MouseEvent>, val: boolean) => {
        this.setState({ showCredentials: val });
    }
    onEmailChanged = (e: any) => {
        this.setState({ email: e.target.value });
    }
    onPasswordChanged = (e: any) => {
        this.setState({ password: e.target.value });
    }
    render() {
        let errorDiv = this.state.error ? <div className={classes.Error}><h4>{this.state.error}</h4></div> : null;
        let loginWithCredentials = this.state.showCredentials ? <div><div className={classes.FormField}>
            <label className={classes.User} htmlFor="login-username"><span className={classes.Hidden}>Username</span></label>
            <input id="login-username" type="text" className="form-input" placeholder="Username" required onChange={(e) => this.onEmailChanged(e)} />
        </div>
            <div className={classes.FormField}>
                <label className={classes.Lock} htmlFor="login-password"><span className={classes.Hidden}>Password</span></label>
                <input id="login-password" type="password" className="form-input" placeholder="Password" required onChange={(e) => this.onPasswordChanged(e)} />
            </div>
            <div className={[classes.FormField, classes.ButtonWrapper].join(' ')}>
                <input type="submit" value="Login" onClick={(e) => this.handleLoginClicked(e, this.state.email, this.state.password)} />
            </div>
            <div className={[classes.FormField, classes.ButtonWrapper].join(' ')}>
                <input type="submit" value="Back to login options" onClick={(e) => this.setShowCredentials(e, false)} />
            </div>
        </div> : undefined;
        let loginInitial = !this.state.showCredentials ? <div>
            <div className={[classes.ButtonWrapper].join(' ')}>
                <input type="submit" value="Proceed with credentials" onClick={(e) => this.setShowCredentials(e,true)} />
            </div>
            <div className={classes.FormField} style={{ justifyContent: 'center' }}>
                OR
                        </div>
            <div className={[classes.ButtonWrapper].join(' ')}>
                <input type="submit" value="Proceed with Gmail" onClick={(e) => this.handleLoginWithGmailClicked(e)} />
            </div>
        </div> : undefined;
        let loginContainer = this.context.user ? <Redirect to="/workinghours" /> : <main className={classes.MainWrapper}>
            <div className={classes.LoginContainer}>
                <img src={logo} alt="logo" style={{ height: '100px', width: '100px' }} />
                <div className={classes.Logo}>Working Hours Calculator</div>
                <div className={classes.LoginItem}>
                    <form className={[classes.form, classes.FormLogin].join(' ')}>
                        {loginWithCredentials}
                        {loginInitial}
                    </form>
                </div>
                {errorDiv}
            </div>
        </main>
        return loginContainer;
    }
}


