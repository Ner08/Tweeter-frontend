import axios, { type AxiosResponse } from 'axios';
import authHeader from './auth-header';

const API_URL: string = 'http://127.0.0.1:8000/api';

class LikeService {
    async like(form: FormData) {
        const response: AxiosResponse = await axios
            .post(API_URL + '/like', form, { headers: authHeader(true) });
        if (response.status == 201) {
            console.log("Liked!")
        }
        return response.data;
    }
    async unlike(form: FormData) {
        const response: AxiosResponse = await axios
            .post(API_URL + '/unlike', form, { headers: authHeader(true) });
        if (response.status == 200) {
            console.log("Unliked!")
        }
        return response.data;
    }
}

export default new LikeService();