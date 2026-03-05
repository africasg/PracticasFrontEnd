import axios from "axios";

export const api = axios.create ({
    baseURL:"https://restcountries.com",
    timeout:5000
})