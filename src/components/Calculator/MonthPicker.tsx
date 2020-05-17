import React, { Component, FunctionComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarPlus } from '@fortawesome/free-solid-svg-icons';
import classes from './MonthPicker.module.css';
import Select from 'react-select';

type MonthBoxProps = {
    value: string,
    onClick: (e: React.MouseEvent) => void
}
type MonthBoxState = {
    value: string
}
class MonthBox extends Component<MonthBoxProps, MonthBoxState> {
    state: MonthBoxState = {
        value: this.props.value || 'N/A',
    }
    UNSAFE_componentWillReceiveProps(nextProps: MonthBoxProps){
      this.setState({value: nextProps.value || 'N/A',});
    }
    render() {
      return (
        <div className="box" onClick={this._handleClick}>
            <label>{this.state.value}</label>
        </div>
      );
    }
    _handleClick = (e: React.MouseEvent) => this.props.onClick && this.props.onClick(e);
}

export interface Month {
    date: Date,
    displayName: string
}
export type PickerValue = {
    year: number,
    month: number
}

type MonthPickerProps = {
    minValue: Date,
    maxValue: Date,
    months: Array<Month> | null,
    monthChangedHandler: (monthValue: PickerValue) => void,
    selectedMonthValue: PickerValue,
    createNewMonthHandler: () => void
}

function FormatDate(dateItem: Date): string {
    return dateItem.toISOString().split("T")[0].substr(0,dateItem.toISOString().split("T")[0].length-3);
}

const MonthPicker: FunctionComponent<MonthPickerProps> = ({minValue, maxValue, months, monthChangedHandler, selectedMonthValue, createNewMonthHandler }) => {    
    const Picker = require('react-month-picker').default;
    const pickerLang = {
        months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        from: 'From', to: 'To',
    }
    let monthElements = months?.map(m=> {
        return { key: m.date.toLocaleDateString(), value: m.date.toLocaleDateString(), label: m.displayName };
    });
    const pickAMonthRef = React.createRef<any>();
    const handleClickMonthBox = (e: React.MouseEvent) => {
        pickAMonthRef.current.show();
    }
    const makeText = (val: PickerValue) => val?.year && val?.month ? (pickerLang.months[val.month-1] + '. ' + val.year) : '?';
    return (
        <>
            <div className={classes.MonthViewerWrapper}>
                <div className={classes.MonthPicker}>
                    <Select isMulti={false} options={monthElements} onChange={() => monthChangedHandler} defaultValue={monthElements?.[0]} placeholder="Pick a month" />
                </div>
                <div style={{display: 'flex',justifyContent: 'center', alignItems: 'center', margin: '10px 5px', flexDirection: 'column'}}>
                    <span>OR</span>
                </div>
                <div className={classes.DatePicker}>
                    {/* <input type="month" min={FormatDate(minValue)} max={FormatDate(maxValue)} 
                        value={selectedMonthValue ? selectedMonthValue : FormatDate(maxValue)} onChange={(e) => monthChangedHandler(e)} /> */}
                    <div className="edit">
                        <Picker ref={pickAMonthRef} 
                            value={selectedMonthValue} 
                            years={{ min: minValue.getFullYear(), max: { year: maxValue.getFullYear(), month: maxValue.getMonth() + 1} }} 
                            lang={pickerLang.months}
                            onChange={() => monthChangedHandler(selectedMonthValue)}
                        />
                        <MonthBox value={makeText(selectedMonthValue)} onClick={(e) => handleClickMonthBox(e)} />
                    </div>
                    <FontAwesomeIcon size={"2x"} icon={faCalendarPlus} onClick={() => createNewMonthHandler()} />
                </div>
            </div>
        </>
    );
}

export default MonthPicker;