import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        list: [],
        inputValue: '',
        nextId: 5,
        viewKey: 'all'
    },
    mutations: {
        initList(state, list) {
            state.list = list
        },
        setInputVal(state, val) {
            state.inputValue = val
        },
        addNewItem(state) {
            const obj = {
                id: state.nextId,
                info: state.inputValue.trim(),
                done: false
            }
            state.list.push(obj)
            state.nextId++
            state.inputValue = ''
        },
        removeItem(state, id) {
            const index = state.list.findIndex(item => item.id === id)
            if (index > -1) {
                state.list.splice(index, 1)
            }
        },
        changeStatus(state, param) {
            const index = state.list.findIndex(item => item.id === param.id)
            if (index > -1) {
                state.list[index].done = param.status
            }
        },
        cleanDone(state) {
            state.list = state.list.filter(item => !item.done)
        },
        changeView(state, key) {
            state.viewKey = key
        }
    },
    actions: {
        //  异步获取原始数据
        async initData(context) {
            const {data} = await axios.get('/mock.json')
            context.commit('initList', data)
        }
    },
    getters: {
        //    未完成的数量
        unDoneNum(state) {
            return state.list.filter(item => !item.done).length
        },
        filterList(state) {
            if (state.viewKey === 'all') {
                return state.list
            } else if (state.viewKey === 'unDone') {
                return state.list.filter(item => !item.done)
            } else {
                return state.list.filter(item => item.done)
            }
        }
    }
})