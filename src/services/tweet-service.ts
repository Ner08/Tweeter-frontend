import axios, { type AxiosResponse } from 'axios';
import authHeader from './auth-header';

const API_URL: string = 'http://127.0.0.1:8000/api/tweets';

class TweetsService {
    //Get All Tweets
    async getAllTweets() {
        const response: AxiosResponse = await axios.get(API_URL, { headers: authHeader(true) })
        if (response.status == 200) {
            localStorage.setItem('tweets', JSON.stringify(response.data));
        }
        return response.data;
    }
    //Get Single Tweet
    async getSingleTweet(id: number) {
        const response: AxiosResponse = await axios.get(API_URL + '/' + id, { headers: authHeader(true) })
        if (response.status == 200) {
            localStorage.setItem('tweet', JSON.stringify(response.data.data));
        }
        return response.data;
    }
    //Store New Tweet
    async storeTweet(form: FormData) {
        const response: AxiosResponse = await axios.post(API_URL, form, { headers: authHeader(true) })
        if (response.status == 200) {
            console.log("Store tweet success: ", response.data)
        }
        return response.data;
    }
    //Update Existing Tweet
    updateTweet(id: number, form: FormData) {
        return axios.put(API_URL + '/' + id, form, { headers: authHeader(true) });
    }
    //Delete Tweet
    deleteTweet(id: number) {
        return axios.delete(API_URL + '/' + id, { headers: authHeader(true) });
    }
}

export default new TweetsService();