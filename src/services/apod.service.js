import axios from 'axios';
const nasaEndpoint = process.env.REACT_APP_NASA_ENDPOINT;
const api_key = process.env.REACT_APP_API_KEY;

export async function GetApod(date) {
    return await axios.get(`${nasaEndpoint}planetary/apod?date=${date}`, {
        params: {
            api_key: api_key
        }
    })
    .then((response) => {
        return response;
    })
    .catch((err) => {
        console.log(err);
    });
}