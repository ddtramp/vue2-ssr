// store.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import { getData } from '../api/data'

export function createStore () {
    return new Vuex.Store({
        state: {
            lists: []
        },
        actions: {
            getDataAction ({ commit }) {
                return getData().then((res) => {
                    console.log('res', res)
                    commit('setData', res)
                })
            }
        },
        mutations: {
            setData (state, data) {
                state.lists = data
            }
            // setItem (state, { id, item }) {
            //   Vue.set(state.items, id, item)
            // }
        }
    })
}