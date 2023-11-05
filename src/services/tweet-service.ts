import axios from 'axios';
import authHeader from './auth-header';

const API_URL: string = 'http://127.0.0.1:8000/api/tweets';

class TweetsService {
    getAllTweets() {
        return axios.get(API_URL, { headers: authHeader(false) });
    }

    getSingleTweet(id: number) {
        return axios.get(API_URL + '/' + id, { headers: authHeader(false) });
    }

    storeTweet(form: FormData) {
        return axios.post(API_URL, form, { headers: authHeader(true) });
    }
    updateTweet(id: number, form: FormData) {
        return axios.put(API_URL + '/' + id, form, { headers: authHeader(true) });
    }

    deleteTweet(id: number) {
        return axios.delete(API_URL + '/' + id, { headers: authHeader(true) });
    }
}

export default new TweetsService();