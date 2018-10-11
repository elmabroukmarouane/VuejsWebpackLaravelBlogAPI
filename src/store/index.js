/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import http from '../http/'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        posts: [],
        users: [],
        user: {},
        headers: {}
    },
    mutations: {
        SET_POSTS_LIST(state, list) {
            let array = []
            for (var prop in list) {
                let item = {}
                item['text'] = list[prop]
                item['value'] = prop
                array.push(item)
            }
            state.posts = array
        },
        SET_USERS_LIST(state, list) {
            let array = []
            for (var prop in list) {
                let item = {}
                item['text'] = list[prop]
                item['value'] = prop
                array.push(item)
            }
            state.users = array
        },
        SET_HEADERS(state, token) {
            state.headers['headers'] = {
                'Authorization': 'Bearer ' + token
            }
        },
        SET_USER(state, user) {
            state.user = user
        },
        SET_POSTS(state, post) {
            state.posts.push(post)
        },
        SET_COMMENT_POST(state, comment, index) {
            state.posts[index].comments.push(comment)
            console.log(state.posts[index].comments)
        },
        SET_COMMENT_POST_USER(state, comment, index_post, index_comment) {
            state.posts[index_post].comments[index_comment].comment = comment
        },
        DELETE_COMMENT_POST(state, post_index, comment_index) {
            state.posts[post_index].comments.splice(comment_index, 1)
        }
    },

    actions: {
        LOAD_POSTS_LIST(context) {
            http.get('posts').then((response) => {
                context.commit('SET_POSTS_LIST', response.data.posts)
            }, (err) => {
                console.log(err)
            })
        },
        EXECUTE_SET_COMMENT_POST(context, comment_array, post_id) {
            context.commit('SET_COMMENT_POST', comment_array, post_id)
        },
        LOAD_USERS_LIST: function(context) {
            http.get('get-users-list').then((response) => {
                context.commit('SET_USERS_LIST', {
                    list: response.data
                })
            }, (err) => {
                console.log(err)
            })
        },
    },
    getters: {
        posts(state) {
            return state.posts
        },
        user(state) {
            return state.user
        }
    }
})
export default store