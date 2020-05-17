import { AxiosResponse } from 'axios';
import axiosInstance from './AxiosInstance';
import { Month } from '../components/Calculator/MonthPicker';

export interface CharactersDictionary {
    [Char: string]: string
}

const replacementCharacters: CharactersDictionary = {
    '.': '_POINT_'
}

const convertToSavedFormat = (data: string): string => {
    let savedFormatString = encodeURIComponent(data ?? "");
    Object.keys(replacementCharacters).forEach(el => {
        savedFormatString = savedFormatString.replace(el,replacementCharacters[el]);
    });
    return savedFormatString;
}
const convertToReadableFormat = (data: string): string => {
    let readableFormatString = decodeURIComponent(data ?? "");
    Object.values(replacementCharacters).forEach(el => {
        let replacement = Object.keys(replacementCharacters).find(key => replacementCharacters[key] === el);
        if(replacement)
            readableFormatString = readableFormatString.replace(el, replacement);
    });
    return readableFormatString;
}

export const getSavedMonths = async(username: string): Promise<Array<Month>> => {
    try {
        const res: AxiosResponse = await axiosInstance.get(`/userData/${convertToSavedFormat(username)}/months.json`);
        let monthArrays = new Array<Month>();
        if(res.data){
            Object.keys(res.data).forEach(m => {
                let dateParts = m.split('-');
                monthArrays.push({ displayName: m, date: new Date(`${dateParts[1]}-${dateParts[0]}-01`)});
            });
        }
        return monthArrays;
    } catch (err) {
        console.log(`GetSavedMonths error: ${err}`);
        return [];
    }
}
