import React, { Component } from 'react';
import { UserContext } from '../../Providers/UserProvider/UserProvider';
import { Redirect } from 'react-router-dom';
import MonthPicker, { Month } from '../../components/Calculator/MonthPicker';
import classes from './Calculator.module.css';
import axios from '../../services/AxiosInstance';
import { AxiosResponse } from 'axios';
import Loader from 'react-loader';
import Select from 'react-select'
import * as dataService from '../../services/DataService';
import loaderClasses from '../../components/Loader/Loader.module.css';
import { PickerValue } from '../../components/Calculator/MonthPicker';

interface Dictionary<T> {
    [Key: string]: T;
}

type CalculatorProps = {

}
type CalculatorState = {
    months: Array<Month>,
    currentMonth: PickerValue,
    hoursPerDay: Dictionary<string>,
    extraHoursPerDay: Dictionary<string>,
    error: string | undefined,
    componentLoaded: boolean
}

export default class Calculator extends Component<CalculatorProps, CalculatorState>{
    _isMounted = false;
    static contextType = UserContext;
    context!: React.ContextType<typeof UserContext>;
    state: CalculatorState = {
        months: new Array<Month>(),
        currentMonth: {year: new Date().getFullYear(), month: new Date().getMonth()+1},
        hoursPerDay: {},
        extraHoursPerDay: {},
        error: undefined,
        componentLoaded: false
    }
    monthChangedHanlder = (newValue: PickerValue) => {
        this.setState({ currentMonth: newValue });
    }
    createNewMonthHandler = () => {
        if (this.state.months.find(m => m.date.getFullYear() === this.state.currentMonth.year && m.date.getMonth() + 1 === this.state.currentMonth.month))
            return;
        //TODO: Create a new month from HebCal service and save it in the DB
        let newMonth = [...this.state.months];
        newMonth.push(
            { 
                date: new Date(`01/${this.state.currentMonth.month}/${this.state.currentMonth.year}`), 
                displayName: `${this.state.currentMonth.month.toString().padStart(2)}-${this.state.currentMonth.year}`
            }
        );
        this.setState({ months: newMonth });
    }
    // monthChangedHanlder = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     this.setState({ currentMonth: e.target.value ?? "" });
    // }
    // createNewMonthHandler = () => {
    //     if (this.state.months.find(m => m.displayName === this.state.currentMonth))
    //         return;
    //     //TODO: Create a new month from HebCal service and save it in the DB
    //     let newMonth = [...this.state.months];
    //     newMonth.push({ date: new Date(`01/${this.state.currentMonth.replace('-', '/')}`), displayName: this.state.currentMonth });
    //     this.setState({ months: newMonth });
    // }
    createMinMonthValue = () => {
        return new Date(new Date().setFullYear(new Date().getFullYear() - 1));
    }
    createMaxMonthValue = () => {
        return new Date();
    }
    setHoursPerDay = async () => {
        try{
            let response: AxiosResponse = await axios.get('hoursPerDayOptions.json');
            if (this._isMounted) {
                this.setState({ hoursPerDay: response.data });
            }
        }
        catch(err){
            if (this._isMounted) {
                this.setState({ error: err.message });
            }
        }
    }
    setExtraHoursPerDay = async () => {
        try{        
            let response: AxiosResponse = await axios.get('extraHoursOptions.json');
            if (this._isMounted) {
                this.setState({ extraHoursPerDay: response.data });
            }
        }
        catch(err){
            if (this._isMounted) {
                this.setState({ error: err.message });
            }
        }
    }
    setMonths = async () => {
        let months = await dataService.getSavedMonths(this.context.user?.email ?? "");
        if (this._isMounted) {
            this.setState({ months: months });
        }
    }
    setComponentLoaded = () => {
        if (this._isMounted) {
            this.setState({ componentLoaded: true });
        }
    }
    async componentDidMount() {
        this._isMounted = true;
        this.setHoursPerDay();
        this.setExtraHoursPerDay();
        this.setMonths();
        this.setComponentLoaded();
    }
    getUserDisplayName = (): string => this.context.user?.displayName ?? this.context.user?.email ?? "";

    componentWillUnmount() {
        this._isMounted = false;
    }
    replaceSpecialChars = (str: string): string => {
        return str?.replace('_', ' ').replace('-', '.');
    }
    extraHoursChangedHandler(){

    }
    hoursPerDayChangedHandler(){

    }
    render() {
        const displayName = this.getUserDisplayName();
        const isLoggedIn = this.context.user ? true : false;
        const hoursPerDayOptions = Object.values(this.state.hoursPerDay).map((h, index) => { 
            return { key: index + '_' + h, value: h, label: h }; 
        });
        const extraHoursOptions = Object.keys(this.state.extraHoursPerDay).map((h, index) => { 
                return { key: index + '_' + h, value: this.state.extraHoursPerDay[h], label: this.replaceSpecialChars(h) };
        });
        const selectStyle = {
            width: '200px',
            margin: '10px 5px'
        };
        return (
            !isLoggedIn ? <Redirect to="/login" /> :
                <React.Fragment>
                    <aside className={classes.AsideWrapper} >
                        <Loader className={loaderClasses.Loader} loaded={this.state.componentLoaded}>
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
                                    <div style={selectStyle}>
                                        <Select isMulti={false} options={hoursPerDayOptions} onChange={this.hoursPerDayChangedHandler} 
                                            defaultValue={hoursPerDayOptions[0]} placeholder="Hours per day" />
                                    </div>
                                    <div style={selectStyle}>
                                        <Select isMulti={false} options={extraHoursOptions} onChange={this.extraHoursChangedHandler} 
                                            defaultValue={extraHoursOptions[0]} placeholder="Extra hours per day" />
                                    </div>
                                </div>
                            </div>
                        </Loader>
                    </aside>
                    <main className={classes.MainWrapper}>

                    </main>
                </React.Fragment>
        );
    }
}   
