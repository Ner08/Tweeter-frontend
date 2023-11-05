import axios from 'axios';
import authHeader from './auth-header';

const API_URL:string = 'http://127.0.0.1:8000/api/users';

class UserService {
  getAllUsers() {
    return axios.get(API_URL, { headers: authHeader(false) });
  }

 /*  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  } */
}

export default new UserService();