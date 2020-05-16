import React, { FunctionComponent } from 'react';
import classes from './MonthPicker.module.css';
import Select from 'react-select';

export interface Month {
    date: Date,
    displayName: string
}

type MonthPickerProps = {
    minValue: Date,
    maxValue: Date,
    months: Array<Month> | null,
    monthChangedHandler: (e: React.ChangeEvent<HTMLInputElement>) => void,
    selectedMonthValue: string,
    createNewMonthHandler: () => void
}

function FormatDate(dateItem: Date): string {
    return dateItem.toISOString().split("T")[0].substr(0,dateItem.toISOString().split("T")[0].length-3);
}

const MonthPicker: FunctionComponent<MonthPickerProps> = ({minValue, maxValue, months, monthChangedHandler, selectedMonthValue, createNewMonthHandler }) => {
    const Picker = require('react-month-picker').default;
    let monthElements = months?.map(m=> {
        return { key: m.date.toLocaleDateString(), value: m.date.toLocaleDateString(), label: m.displayName };
    });
    const pickAMonthRef = React.createRef();
    return (
        <>
            <div className={classes.MonthViewerWrapper}>
                <div className={classes.MonthPicker}>
                    <Select isMulti={false} options={monthElements} onChange={() => monthChangedHandler} defaultValue={monthElements?.[0]} placeholder="Pick a month" />
                </div>
                <div className={classes.DatePicker}>
                    <input type="month" min={FormatDate(minValue)} max={FormatDate(maxValue)} 
                        value={selectedMonthValue ? selectedMonthValue : FormatDate(maxValue)} onChange={(e) => monthChangedHandler(e)} />
                    <div className="edit">
                        <Picker className={classes.MonthPickerElement} ref={pickAMonthRef} 
                            value={{year: 2020, month: 1}} years={{ min: minValue.getFullYear(), max: { year: maxValue.getFullYear(), month: maxValue.getMonth()} }} />
                    </div>
                    <button className={classes.CreateNewMonth} onClick={() => createNewMonthHandler()}>Create month</button>
                </div>

            </div>
        </>
    );
}

export default MonthPicker;