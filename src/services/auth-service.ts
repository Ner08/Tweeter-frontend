import axios, { type AxiosResponse } from 'axios';

const API_URL: string = 'http://127.0.0.1:8000/api/users';

type User = {
    id?: number;
    name: string;
    username: string;
    email: string;
    password?: string;
    password_confirmation?: string
    accessToken?: string;
    exists?:boolean
}


class AuthService {
    async login(user: User) {
        const response: AxiosResponse = await axios
            .post(API_URL + '/login', {
                email: user.email,
                password: user.password
            });
        if (response.data.accessToken) {
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data;
    }

    async logout(user: User) {
        const response: AxiosResponse = await axios
            .post(API_URL + '/logout/' + user.id);
        if (response.status === 200) {
            localStorage.removeItem('user');
        }
        return response.data;

    }

    async register(user: User) {
        const response: AxiosResponse = await axios.post(API_URL, {
            name: user.name,
            userName: user.username,
            email: user.email,
            password: user.password,
            password_confirmation: user.password_confirmation
        });
        if (response.status === 201) {
            console.log('Success Register')
            localStorage.removeItem('user');
            this.login(user)
        }
        else{
            console.log('response.error')
        }
        return response.data;

    }
}

export default new AuthService();