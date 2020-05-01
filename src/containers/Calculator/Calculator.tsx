import React, {Component} from 'react';
import { UserContext } from '../../Providers/UserProvider/UserProvider';
import { Redirect } from 'react-router-dom';


export default class Calculator extends Component<{}>{
    static contextType = UserContext;
    context!: React.ContextType<typeof UserContext>;

    render(){
        const isLoggedIn = this.context.user ? true : false;
        return (
            !isLoggedIn ? <Redirect to="/login" /> : <div>Working Hours</div>
        );
    }
}   
