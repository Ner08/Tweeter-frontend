import axios, { type AxiosResponse } from 'axios';
import authHeader from './auth-header';
import store from '@/store';

const API_URL: string = 'http://127.0.0.1:8000/api/tweets';

class TweetsService {
    //Get All Tweets
    async getAllTweets() {
        store.commit('auth/setLoading')
        const response: AxiosResponse = await axios.get(API_URL, { headers: authHeader(true) })
        if (response.status == 200) {
            localStorage.setItem('tweets', JSON.stringify(response.data));
        }
        store.commit('auth/stopLoading')
        return response.data;
    }
    //Get Single Tweet
    async getSingleTweet(id: number) {
        store.commit('auth/setLoading')
        const response: AxiosResponse = await axios.get(API_URL + '/' + id, { headers: authHeader(true) })
        if (response.status == 200) {
            localStorage.setItem('tweet', JSON.stringify(response.data.data));
        }
        store.commit('auth/stopLoading')
        return response.data;
    }
    async getComments(id: number) {
        store.commit('auth/setLoading')
        const response: AxiosResponse = await axios.get(API_URL + '/comments/' + id, { headers: authHeader(true) })
        if (response.status == 200) {
            localStorage.setItem('comments', JSON.stringify(response.data.comments));
        }
        store.commit('auth/stopLoading')
        return response.data.comments;
    }
    //Store New Tweet
    async storeTweet(form: FormData) {
        store.commit('auth/setLoading')
        const response: AxiosResponse = await axios.post(API_URL, form, { headers: authHeader(true) })
        if (response.status == 200) {
            console.log("Store tweet success: ", response.data)
        }
        store.commit('auth/stopLoading')
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