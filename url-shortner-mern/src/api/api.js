import axios from "axios";
const apiURL = "http://localhost:8001"

export default axios.create({
    baseURL: apiURL
})
