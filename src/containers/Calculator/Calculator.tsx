import React, { Component } from 'react';
import { UserContext } from '../../Providers/UserProvider/UserProvider';
import { Redirect } from 'react-router-dom';
import MonthPicker, { Month } from '../../components/Calculator/MonthPicker';
import classes from './Calculator.module.css';
import axios from '../../services/AxiosInstance';
import { AxiosError, AxiosResponse } from 'axios';

interface Dictionary<T> {
    [Key: string]: T;
}

type CalculatorProps = {

}
type CalculatorState = {
    months: Array<Month>,
    currentMonth: string,
    hoursPerDay: Dictionary<string>,
    extraHoursPerDay: Dictionary<string>,
    error: string | undefined
}

export default class Calculator extends Component<CalculatorProps, CalculatorState>{
    _isMounted = false;
    static contextType = UserContext;
    context!: React.ContextType<typeof UserContext>;
    state: CalculatorState = {
        months: new Array<Month>({ date: new Date("01/04/2020"), displayName: "2020-04" },
            { date: new Date("01/05/2020"), displayName: "2020-05" }, { date: new Date("01/06/2020"), displayName: "2020-06" }),
        currentMonth: "",
        hoursPerDay: {},
        extraHoursPerDay: {},
        error: undefined
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
    setHoursPerDay = () => {
        axios.get('hoursPerDayOptions.json')
            .then((response: AxiosResponse) => {
                if (this._isMounted) {
                    this.setState({ hoursPerDay: response.data });
                }
            }).catch((err: AxiosError) => {
                if (this._isMounted) {
                    this.setState({ error: err.message });
                }
            });
    }
    setExtraHoursPerDay = () => {
        axios.get('extraHoursOptions.json')
            .then((response: AxiosResponse) => {
                if (this._isMounted) {
                    this.setState({ extraHoursPerDay: response.data });
                }
            }).catch((err: AxiosError) => {
                if (this._isMounted) {
                    this.setState({ error: err.message });
                }
            });
    }
    componentDidMount() {
        this._isMounted = true;
        this.setHoursPerDay();
        this.setExtraHoursPerDay();
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    replaceSpecialChars = (str: string): string => {
        return str?.replace('_',' ').replace('-','.');
    }
    render() {
        const user = this.context.user;
        const displayName = user?.displayName ?? user?.email;
        const isLoggedIn = user ? true : false;
        const hoursPerDayDDL = <select name="hoursPerDayDDL">
            {Object.values(this.state.hoursPerDay).map((h,index) => { return <option key={index + '_' + h} value={h}>{h}</option>;} )}
        </select>;
        const extraHoursPerDayDDL = <select name="extraHoursPerDayDDL">
            {Object.keys(this.state.extraHoursPerDay).map(
                (h,index) => { return <option key={index + '_' + h} value={this.state.extraHoursPerDay[h]}>{this.replaceSpecialChars(h)}</option>;} )
            }
        </select>;
        return (
            !isLoggedIn ? <Redirect to="/login" /> :
                <React.Fragment>
                    <aside className={classes.AsideWrapper} >
                        <div style={{ textTransform: 'capitalize' }}>Hello, {displayName}</div>
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
                                    {hoursPerDayDDL}
                                </div>
                                <div>
                                    Calculate extra hours by:
                                    {extraHoursPerDayDDL}
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
