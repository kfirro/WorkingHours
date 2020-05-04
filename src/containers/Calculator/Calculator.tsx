import React, { Component } from 'react';
import { UserContext } from '../../Providers/UserProvider/UserProvider';
import { Redirect } from 'react-router-dom';
import MonthPicker, { Month } from '../../components/Calculator/MonthPicker';
import classes from './Calculator.module.css';

type CalculatorProps = {

}
type CalculatorState = {
    months: Array<Month>,
    currentMonth: string
}

export default class Calculator extends Component<CalculatorProps, CalculatorState>{
    static contextType = UserContext;
    context!: React.ContextType<typeof UserContext>;
    state: CalculatorState = {
        months: new Array<Month>({ date: new Date("01/04/2020"), displayName: "2020-04" },
            { date: new Date("01/05/2020"), displayName: "2020-05" }, { date: new Date("01/06/2020"), displayName: "2020-06" }),
        currentMonth: ""
    }
    monthChangedHanlder = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ currentMonth: e.target.value ?? "" });
    }
    createNewMonthHandler = () => {
        if (this.state.months.find(m => m.displayName === this.state.currentMonth))
            return;
        let newMonth = [...this.state.months];
        newMonth.push({ date: new Date(`01/${this.state.currentMonth.replace('-', '/')}`), displayName: this.state.currentMonth });
        this.setState({ months: [...newMonth] });
    }
    createMinMonthValue = () => {
        return new Date(new Date().setFullYear(new Date().getFullYear() - 1));
    }
    createMaxMonthValue = () => {
        return new Date();
    }
    render() {
        const user = this.context.user;
        const isLoggedIn = user ? true : false;
        return (
            !isLoggedIn ? <Redirect to="/login" /> :
                <React.Fragment>
                    <aside className={classes.AsideWrapper} >
                        <div>Hello, {user?.email}</div>
                        <div className={classes.PanelWrapper}>
                            <MonthPicker minValue={this.createMinMonthValue()} maxValue={this.createMaxMonthValue()}
                                months={this.state.months} monthChangedHandler={this.monthChangedHanlder}
                                selectedMonthValue={this.state.currentMonth} createNewMonthHandler={this.createNewMonthHandler} />
                        </div>
                        <div className={classes.StatsWrapper}>
                            <div>
                                <ul>
                                    <li>Working days: 22</li>
                                    <li>Hours needed: 198h</li>
                                    <li>Total hours done: 214h 11m</li>
                                    <li>Time left: 0h</li>
                                    <li>Balance: 43h 11m</li>
                                    <li>Extra time (custom): 2h 15m</li>
                                </ul>
                            </div>
                            <div className={classes.StatsHourWrapper}>
                                <div>
                                    Calculate by:
                                <select name="hoursPreDayDDL">
                                        <option value="9">9</option>
                                        <option value="8.5">8.5</option>
                                        <option value="8">8</option>
                                    </select>
                                </div>
                                <div>
                                    Calculate extra hours by:
                                <select name="hoursPreDayDDL">
                                        <option value="0">None</option>
                                        <option value="8.5">After 8.5h</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </aside>
                    <main className={classes.MainWrapper}>

                    </main>
                </React.Fragment>
        );
    }
}   
