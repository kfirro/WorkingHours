import React, { FunctionComponent } from 'react';

type InputProps = {
    id: string,
    type: string,
    text?: string,
    placeHolder: string,
    cssClass?: string,
    minLength?: number,
    maxLength?: number,
    label?: string,
    required?: boolean    
}

const TextInput: FunctionComponent<InputProps> = ({ id, type, text, cssClass, minLength, maxLength, label, placeHolder, required }) => { 
    let labelElm = label && id ? <label htmlFor={id}>{label}</label> : undefined;
    return <>
        {labelElm}&nbsp;
        <input id={id} type={type} minLength={minLength} maxLength={maxLength} defaultValue={text} className={cssClass} placeholder={placeHolder} {...required}/> 
    </>
}

export default TextInput;