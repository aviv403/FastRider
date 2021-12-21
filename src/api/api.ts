import axios from 'axios'
import { toast } from 'react-toastify';

const api = {
    url: process.env.REACT_APP_URL,
    token: process.env.REACT_APP_TOKEN,
}

//get rides
export const getApiRequest = async () => {
    const { url, token } = api;
    const myUrl = url + 'api/v1/rides?token=' + token;
    let respData = null;

    await axios({
        method: 'get',
        url: myUrl,
        headers: {
            'Content-Type': 'application/json',
        }
    }).then((response: any) => respData = response?.data)
        .catch(err => console.error(err))

    return respData;
}

//post ticket
export const ticketApiResponse = async (pin: string, rideId: number) => {
    const { url, token } = api;
    const myUrl = url + 'api/v1/tickets'
    let respData = null;

    const formData = new FormData();

    formData.append('pin', pin);
    formData.append('ride_id', rideId + '');
    formData.append('token', token + '');

    await axios({
        method: 'post',
        url: myUrl,
        data: formData,
        headers: {
            'Content-Type': 'application/json',
        }
    }).then((response: any) => respData = response?.data)
        .catch(err => toast.error(err.response?.data?.message, {position: 'top-center'}))

    return respData;
}

