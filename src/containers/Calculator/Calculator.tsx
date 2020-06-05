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
import ReactDataSheet from 'react-datasheet';
import loaderClasses from '../../components/Loader/Loader.module.css';
import { PickerValue } from '../../components/Calculator/MonthPicker';

interface Dictionary<T> {
    [Key: string]: T;
}
type Preferences = {
    calculateExtraHours: number,
    hoursPerDay: number,
} | null;

type CalculatorProps = {
    openSideBar: boolean
}
type CalculatorState = {
    months: Array<Month>,
    currentMonth: PickerValue,
    hoursPerDay: Dictionary<string>,
    extraHoursPerDay: Dictionary<string>,
    error: string | undefined,
    componentLoaded: boolean,  
    columns: Array<string>,
    userPreferences: Preferences,
    extraHoursChoosedIndex: number,
    hoursPerDayChoosedIndex: number,
    currentMonthData: Array<any>,
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
        componentLoaded: false,
        columns: [],
        userPreferences: null,
        extraHoursChoosedIndex: 0,
        hoursPerDayChoosedIndex: 0,
        currentMonthData: [],
    }
    monthChangedHanlder = (year: number, month: number) => {
        this.setState({ currentMonth: {year: year, month: month} });
    }
    createNewMonthHandler = () => {
        if (this.state.months.find(m => m.date.getFullYear() === this.state.currentMonth.year && m.date.getMonth() + 1 === this.state.currentMonth.month))
            return;
        //TODO: Create a new month from HebCal service and save it in the DB
        let newMonth = [...this.state.months];
        newMonth.push(
            { 
                date: new Date(`01/${this.state.currentMonth.month}/${this.state.currentMonth.year}`), 
                displayName: `${this.state.currentMonth.month.toString().padStart(2,'0')}-${this.state.currentMonth.year}`
            }
        );
        this.setState({ months: newMonth });
    }
    createMinMonthValue = () => {
        return new Date(new Date().setFullYear(new Date().getFullYear() - 1));
    }
    createMaxMonthValue = () => {
        return new Date();
    }
    setCalculatorColumns = async () => {
        try{
            let response: AxiosResponse = await axios.get('calculatorColumns.json');
            if (this._isMounted) {
                this.setState({ columns:  Object.keys(response.data)});
            }
        }
        catch(err){
            if (this._isMounted) {
                this.setState({ error: err.message });
            }
        }
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
    getAndSetUserPreferences = async () => {
        let preferences: Preferences = await dataService.getUserPreferences(this.context.user?.email ?? "");
        if (this._isMounted && preferences) {
            Object.entries(this.state.extraHoursPerDay).forEach(([key, value], index) => {
                if(+value === preferences?.calculateExtraHours)
                    this.setState({ extraHoursChoosedIndex: index });
            });
            Object.entries(this.state.hoursPerDay).forEach(([key, value], index) => {
                if(+value === preferences?.hoursPerDay)
                    this.setState({ hoursPerDayChoosedIndex: index });
            });
            this.setState({ userPreferences: preferences });
        }
    }
    setSelectedMonthData = async () => {
        //TODO: Fetch from data service
        //{"Day": "Sunday","Date": "01/05/2020", "Entrance time": "07:00", "Exit time": "18:00", "Total": "09:00", "Holiday": "יום העצמאות", "Comment": "blabla"}
        this.setState({ currentMonthData: [ 
            [
                {value: 'Day', readOnly: true},
                {value: 'Date', readOnly: true},
                {value: 'Entrance time', readOnly: true},
                {value: 'Exit time', readOnly: true},
                {value: 'Total', readOnly: true},
                {value: 'Holiday', readOnly: true},
                {value: 'Comment', readOnly: true},
              ],
              [{value: 1}, {value: 3}, {value: 3}, {value: 3}, {value: 3}, {value: 3}, {value: 3}],
              [{value: 2}, {value: 4}, {value: 4}, {value: 4}, {value: 4}, {value: 4}, {value: 4}],
              [{value: 1}, {value: 3}, {value: 3}, {value: 3}, {value: 3}, {value: 3}, {value: 3}],
              [{value: 2}, {value: 4}, {value: 4}, {value: 4}, {value: 4}, {value: 4}, {value: 4}]            
        ]});
    }
    setupData = (cb: Function) => {
        this._isMounted = true;
        Promise.all([this.setHoursPerDay(),this.setExtraHoursPerDay(),this.setMonths(),this.setCalculatorColumns(),this.getAndSetUserPreferences()])
            .then((values) => {
                this.setSelectedMonthData();
                cb();
        });
    }
    componentDidMount() {
        this.setupData(this.setComponentLoaded);        
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
        const sideBar = <aside className={classes.AsideWrapper} >
        <Loader className={loaderClasses.Loader} loaded={this.state.componentLoaded}>
            <div style={{ textTransform: 'capitalize' }}>Hello, {displayName}</div>
            <div className={classes.PanelWrapper}>
                <MonthPicker minValue={this.createMinMonthValue()} maxValue={this.createMaxMonthValue()}
                    months={this.state.months} monthChangedHandler={this.monthChangedHanlder}
                    selectedMonthValue={this.state.currentMonth} createNewMonthHandler={this.createNewMonthHandler} />
            </div>
            <div className={classes.StatsWrapper}>
                <div>
                    <h3>Statistics</h3>
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
                            defaultValue={hoursPerDayOptions[this.state.hoursPerDayChoosedIndex]} placeholder="Hours per day" />
                    </div>
                    <div style={selectStyle}>
                        <Select isMulti={false} options={extraHoursOptions} onChange={this.extraHoursChangedHandler} 
                            defaultValue={extraHoursOptions[this.state.extraHoursChoosedIndex]} placeholder="Extra hours per day" />
                    </div>
                </div>
            </div>
        </Loader>
    </aside>;
        return (
            !isLoggedIn ? <Redirect to="/login" /> :
                <React.Fragment>
                    {this.props.openSideBar ? sideBar : null}
                    <main className={classes.MainWrapper}>
                        <ReactDataSheet 
                            data={this.state.currentMonthData} 
                            valueRenderer={ (cell: any) => cell.value }
                            onCellsChanged={changes => {
                                const grid = this.state.currentMonthData.map(row => [...row]);
                                changes.forEach(({ cell, row, col, value }) => {
                                  grid[row][col] = { ...grid[row][col], value };
                                });
                                this.setState({currentMonthData: grid});
                              }}
                        />
                    </main>
                </React.Fragment>
        );
    }
}   
