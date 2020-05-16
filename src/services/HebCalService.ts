import axios from 'axios';

type HebCalItem = {
    link: string,
    memo: string,
    title: string,
    subcat: string,
    hebrew: string,
    date: string,
    title_org: string,
    category: string,
};

type HebCal = {
    items: Array<HebCalItem>
};

export const GetHebCal = async (month: string, year: string): Promise<HebCal> => {
    let res = null;
    try{
        res =  await axios.get(`http://www.hebcal.com/hebcal/?v=1S&cfg=json&maj=on&min=on&mf=on&mod=on&i=on&year=${year}&month=${month}&yt=G&lg=h&c=off&geo=geoname&zip=&city=&geonameid=&b=18&m=50&.s=Create+Calendar#hcdl-modal`);
    }
    catch(err){
        console.log(`GetHebCal error: ${err}`);
    }
    return res?.data;
}

