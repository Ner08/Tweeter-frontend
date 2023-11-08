import axios, { type AxiosResponse } from 'axios';
import authHeader from './auth-header';
import type { User } from '@/composables/custom-types';
import store from '@/store';

const API_URL: string = 'http://127.0.0.1:8000/api/users';
class AuthService {
    async login(user: User) {
        store.commit('auth/setLoading')
        const response: AxiosResponse = await axios
            .post(API_URL + '/login', {
                email: user.email,
                password: user.password
            });
        if (response.status == 201) {
            localStorage.setItem('user', JSON.stringify(response.data.user));
            localStorage.setItem('token', response.data.token);
        }
        store.commit('auth/stopLoading')
        return response.data;
    }

    async logout(user: User) {
        store.commit('auth/setLoading')
        console.log("auth-header: ", authHeader(false))
        const response: AxiosResponse = await axios
            .get(API_URL + '/logout/' + user.id, { headers: authHeader(false) });
        if (response.status === 200) {
            localStorage.removeItem('user');
            localStorage.removeItem('token')
        }
        store.commit('auth/stopLoading')
        return response.data;

    }

    async register(user: User) {
        store.commit('auth/setLoading')
        const response: AxiosResponse = await axios.post(API_URL, {
            name: user.name,
            userName: user.userName,
            email: user.email,
            password: user.password,
            password_confirmation: user.password_confirmation
        });
        if (response.status === 201) {
            console.log('Success Register')
            localStorage.removeItem('user');
            store.commit('auth/stopLoading')
        }
        else {
            console.log('response.error')
            store.commit('auth/stopLoading')
        }
        return response.data;

    }
}

export default new AuthService();