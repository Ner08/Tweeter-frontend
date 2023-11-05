import AuthService from "../services/auth-service";

type User = {
  id?:number;
  name: string;
  username: string;
  email: string;
  password?: string;
  password_confirmation?: string
  accessToken?:string;
  exists?:boolean
}

const user: User = JSON.parse(localStorage.getItem('user') || '{"exists": false}');
console.log("user: ", user.exists)
const initialState = user.exists
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null }

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    login({ commit }: any, user: User) {
      return AuthService.login(user).then(
        user => {
          commit('loginSuccess', user);
          return Promise.resolve(user);
        },
        error => {
          commit('loginFailure');
          return Promise.reject(error);
        }
      );
    },
    logout({ commit }: any) {
      AuthService.logout(user);
      commit('logout');
    },
    register({ commit }: any, user: User) {
      return AuthService.register(user).then(
        response => {
          commit('registerSuccess');
          return Promise.resolve(response.data);
        },
        error => {
          commit('registerFailure');
          return Promise.reject(error);
        }
      );
    }
  },
  mutations: {
    loginSuccess(state: { status: { loggedIn: boolean; }; user: any; }, user: any) {
      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure(state: { status: { loggedIn: boolean; }; user: null; }) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logout(state: { status: { loggedIn: boolean; }; user: null; }) {
      state.status.loggedIn = false;
      state.user = null;
    },
    registerSuccess(state: { status: { loggedIn: boolean; }; }) {
      state.status.loggedIn = false;
    },
    registerFailure(state: { status: { loggedIn: boolean; }; }) {
      state.status.loggedIn = false;
    }
  }
};