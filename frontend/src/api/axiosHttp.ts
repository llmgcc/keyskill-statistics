import axios from "axios";

export const axiosHTTP = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? '/keyskill-statistics/' : '/'
});