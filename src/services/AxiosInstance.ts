import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://workinghours-app.firebaseio.com/'
});

axiosInstance.interceptors.request.use(x => {
    console.log(`${new Date()} | Request: ${x.method?.toUpperCase()} | ${x.url} | ${JSON.stringify(x.data)}`);
    return x;
});

export default axiosInstance;