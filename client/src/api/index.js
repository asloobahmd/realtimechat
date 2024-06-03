import axios from "axios";

const apu_url = import.meta.env.VITE_API_URL;

const API = axios.create({ baseURL: apu_url });

export default API;
