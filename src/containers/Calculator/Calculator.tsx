import React, {Component} from 'react';
import { UserContext } from '../../Providers/UserProvider/UserProvider';
import { Redirect } from 'react-router-dom';
import MonthPicker, { Month } from '../../components/Calculator/MonthPicker';

type CalculatorProps = {

}
type CalculatorState = {
    months: Array<Month>,
    currentMonth: string
}

export default class Calculator extends Component<CalculatorProps,CalculatorState>{
    static contextType = UserContext;
    context!: React.ContextType<typeof UserContext>;
    state: CalculatorState = {
        months: new Array<Month>({date: new Date("01/04/2020"),displayName: "2020-04"},
            {date: new Date("01/05/2020"),displayName: "2020-05"},{date: new Date("01/06/2020"),displayName: "2020-06"}),
        currentMonth: ""
    }
    monthChangedHanlder = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({currentMonth: e.target.value ?? "" });
    }
    createNewMonthHandler = () => {
        if(this.state.months.find(m=> m.displayName === this.state.currentMonth))
            return;
        let newMonth = [...this.state.months];
        newMonth.push({date: new Date(`01/${this.state.currentMonth.replace('-','/')}`),displayName: this.state.currentMonth});
        this.setState({months: [...newMonth]});
    }
    createMinMonthValue = () => {
        return new Date(new Date().setFullYear(new Date().getFullYear()-1));
    }
    createMaxMonthValue = () => {
        return new Date();
    }
    render(){
        const user = this.context.user;
        const isLoggedIn = user ? true : false;
        return (
            !isLoggedIn ? <Redirect to="/login" /> :             
                <React.Fragment>
                    <div>Hello, {user?.email}</div>
                    <MonthPicker minValue={this.createMinMonthValue()} maxValue={this.createMaxMonthValue()}
                        months={this.state.months} monthChangedHandler={this.monthChangedHanlder} 
                        selectedMonthValue={this.state.currentMonth} createNewMonthHandler={this.createNewMonthHandler}/>
                </React.Fragment>
        );
    }
}   
