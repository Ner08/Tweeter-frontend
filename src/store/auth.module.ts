import AuthService from "../services/auth-service";

type User = {
  id?:number;
  name?: string;
  username?: string;
  email: string;
  password?: string;
  password_confirmation?: string
  accessToken?:string;
  exists?:boolean
}

const user: User = JSON.parse(localStorage.getItem('user') || '{"exists": false}');
const initialState = user.exists
  ? { status: { loggedIn: true }, user:user }
  : { status: { loggedIn: false }, user: null }

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    login({ commit }: any, user: User) {
      return AuthService.login(user).then(
        data => {
          commit('loginSuccess', data);
          return Promise.resolve(data);
        },
        error => {
          commit('loginFailure');
          return Promise.reject(error);
        }
      );
    },
    logout({ commit }: any, user: User) {
      AuthService.logout(user).then(
        data => {
          console.log("Success Logout with data: ", data)
          commit('logout');
        },
        error => {
          console.log('logout Failure with errors: ', error);
        }
      );
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
    loginSuccess(state: { status: { loggedIn: boolean; }; user: User; token: User;}, data: any) {
      state.status.loggedIn = true;
      state.user = data.user;
      state.token = data.token
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