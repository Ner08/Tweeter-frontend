import AuthService from "../services/auth-service";
import TweetService from "@/services/tweet-service";
import LikeService from "@/services/like-service";
import type { User, Tweet } from "@/composables/custom-types";


const user: User = JSON.parse(localStorage.getItem('user') || '{"exists": false}');

const initialState = user.exists
  ? { status: { loggedIn: true }, user: user, loading: false }
  : { status: { loggedIn: false }, user: null, loading: false }

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
    getTweet({ commit }: any, id: number) {
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
    getComments({ commit }: any, id: number) {
      return TweetService.getComments(id).then(
        response => {
          console.log("Response Get Comments: ", response)
          commit('getCommentsSuccessful', response);
          return Promise.resolve(response);
        },
        error => {
          console.log("Error getComments: ", error)
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
    },
    storeComment({ commit }: any, form: FormData) {
      return TweetService.storeTweet(form).then(
        response => {
          console.log("Response Store Comment: ", response.tweet)
          commit('storeCommentSuccess', response.tweet);
          return Promise.resolve(response);
        },
        error => {
          console.log("Error getComments: ", error)
          return Promise.reject(error);
        }
      );
    },
    likeTweet(form: FormData) {
      return LikeService.like(form).then(
        response => {
          console.log("Response Like", response);
          return Promise.resolve(response);
        },
        error => {
          console.log("Error Like: ", error)
          return Promise.reject(error);
        }
      );
    },
    unlikeTweet(form: FormData) {
      return LikeService.unlike(form).then(
        response => {
          console.log("Response Unlike", response);
          return response;
        },
        error => {
          console.log("Error Unlike: ", error)
          return Promise.reject(error);
        }
      );
    }
  },
  mutations: {
    setLoading(state: { loading: boolean }) {
      state.loading = true
    },
    stopLoading(state: { loading: boolean }) {
      state.loading = false
    },
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
    getSingleTweetSuccess(state: { tweet: Tweet }, tweet: Tweet) {
      state.tweet = tweet;
    },
    getCommentsSuccessful(state: { comments: Array<Tweet> }, comments: Array<Tweet>) {
      state.comments = comments;
    },
    storeTweetsSuccess(state: { tweets: Array<Tweet> }, tweet: Tweet) {
      const newTweetArr: Array<Tweet> = state.tweets;
      newTweetArr.unshift(tweet)
      state.tweets = newTweetArr
    },
    storeCommentSuccess(state: { comments: Array<Tweet> }, comment: Tweet) {
      const newCommentArr: Array<Tweet> = state.comments;
      newCommentArr.unshift(comment)
      state.comments = newCommentArr
    }
  }
};