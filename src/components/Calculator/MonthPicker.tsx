import React, { FunctionComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import classes from './MonthPicker.module.css';
import Select from 'react-select';

type MonthBoxProps = {
    value: string,
    onClick: (e: React.MouseEvent) => void
}
type MonthBoxState = {
    value: string
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
    monthChangedHandler: (year: number, month: number) => void,
    selectedMonthValue: PickerValue,
    createNewMonthHandler: () => void
}


const MonthPicker: FunctionComponent<MonthPickerProps> = ({minValue, maxValue, months, monthChangedHandler, selectedMonthValue, createNewMonthHandler }) => {    
    const Picker = require('react-month-picker').default;
    const pickerLang = {
        months: ['01','02','03','04','05','06','07','08','09','10','11','12'],
        from: 'From', to: 'To',
    }
    let monthElements = months?.map(m=> {
        return { key: m.date.toLocaleDateString(), value: m.date.toLocaleDateString(), label: m.displayName };
    });
    const pickAMonthRef = React.createRef<any>();
    const handleClickMonthBox = (e: React.MouseEvent) => {
        pickAMonthRef.current.show();
    }
    monthChangedHandler = monthChangedHandler.bind(MonthPicker);
    // const makeText = (val: PickerValue) => val?.year && val?.month ? (pickerLang.months[val.month-1] + ' - ' + val.year) : '?';
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
                        <Picker ref={pickAMonthRef} 
                            value={selectedMonthValue} 
                            years={{ min: minValue.getFullYear(), max: { year: maxValue.getFullYear(), month: maxValue.getMonth() + 1} }} 
                            lang={pickerLang.months}
                            onChange={monthChangedHandler}
                            onDismiss={() => createNewMonthHandler()}
                        />
                        <label onClick={(e) => handleClickMonthBox(e)}>
                            <FontAwesomeIcon style={{color: '#61dafb'}} size={"2x"} icon={faCalendarAlt} />
                        </label>
                </div>
            </div>
        </>
    );
}

export default MonthPicker;