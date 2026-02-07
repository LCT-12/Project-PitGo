import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5000/api', // Đường dẫn Backend của bạn
});

export default instance;