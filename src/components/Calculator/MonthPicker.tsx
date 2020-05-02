import React, { FunctionComponent } from 'react';
import classes from './MonthPicker.module.css';

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
    let monthElements = months?.map(m=> {
        return <option key={m.date.toLocaleDateString()} value={m.date.toLocaleDateString()}>{m.displayName}</option>
    });
    return (
        <>
            <div className={classes.MonthViewerWrapper}>
                <div className={classes.MonthPicker}>
                    <select name="monthPickerDDL">
                        {monthElements}
                    </select>
                </div>
                <div className={classes.DatePicker}>
                    <input type="month" min={FormatDate(minValue)} max={FormatDate(maxValue)} value={selectedMonthValue ? selectedMonthValue : FormatDate(maxValue)} onChange={(e) => monthChangedHandler(e)} />
                    <button className={classes.CreateNewMonth} onClick={() => createNewMonthHandler()}>Create month</button>
                </div>

            </div>
        </>
    );
}

export default MonthPicker;