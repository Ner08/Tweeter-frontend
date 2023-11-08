import axios from 'axios';
import authHeader from './auth-header';
import store from '@/store';

const API_URL: string = 'http://127.0.0.1:8000/api/users';

class UserService {

  getAllUsers() {
    store.commit('auth/setLoading')
    return axios.get(API_URL, { headers: authHeader(false) }).then(
      data => {
        console.log("Data:", data)
        store.commit('auth/stopLoading')
      },
      error => {
        console.log("Error:", error)
        store.commit('auth/stopLoading')
      }
    )
  }
}

export default new UserService();