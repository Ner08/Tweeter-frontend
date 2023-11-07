import AuthService from "../services/auth-service";
import TweetService from "@/services/tweet-service";

type User = {
  id?: number;
  name?: string;
  username?: string;
  email: string;
  password?: string;
  password_confirmation?: string
  accessToken?: string;
  exists?: boolean
}
export interface Tweet {
  id: number
  userName: string
  name: string
  created_at: Date
  updated_at: Date
  createdAgo: string
  message?: string
  file?: string
  user_id: number
  parent_tweet_id?:number
  shareUrl?: string
  like: number
  shares: number
  views: number
  numOfComments: number
}

const user: User = JSON.parse(localStorage.getItem('user') || '{"exists": false}');

const initialState = user.exists
  ? { status: { loggedIn: true }, user: user }
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
    },
    getTweets({ commit }: any) {
      return TweetService.getAllTweets().then(
        response => {
          console.log("Response Get Tweets: ", response.data)
          commit('getTweetsSuccess', response.data);
          return Promise.resolve(response.data);
        },
        error => {
          console.log("Error getTweets: ", error)
          return Promise.reject(error);
        }
      );
    },
    getTweet({ commit }: any, id:number) {
      return TweetService.getSingleTweet(id).then(
        response => {
          console.log("Response Get Single Tweet: ", response.data)
          commit('getSingleTweetSuccess', response.data);
          return Promise.resolve(response.data);
        },
        error => {
          console.log("Error getSingleTweet: ", error)
          return Promise.reject(error);
        }
      );
    },
    storeTweets({ commit }: any, form: FormData) {
      return TweetService.storeTweet(form).then(
        response => {
          console.log("Response Store Tweets: ", response.tweet)
          commit('storeTweetsSuccess', response.tweet);
          return Promise.resolve(response);
        },
        error => {
          console.log("Error getTweets: ", error)
          return Promise.reject(error);
        }
      );
    }
  },
  mutations: {
    loginSuccess(state: { status: { loggedIn: boolean; }; user: User; token: User; }, data: any) {
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
    },
    getTweetsSuccess(state: { tweets: Array<Tweet> }, tweets: Array<Tweet>) {
      state.tweets = tweets;
    },
    getSingleTweetSuccess(state: { tweet: Tweet }, tweet: Tweet){
      state.tweet = tweet;
    },
    storeTweetsSuccess(state: { tweets: Array<Tweet> }, tweet: Tweet) {
      const newTweetArr: Array<Tweet> = state.tweets;
      newTweetArr.unshift(tweet)
      console.log("newTweetArr: ", newTweetArr)
      //Set loader in the future
    }
  }
};