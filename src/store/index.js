import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todoList: [
      {
        title: 'Задача номер 1',
        isCompleted: false,
        created_at: 1624860760183,
      },
    ],
  },

  mutations: {
    SET_TODO_LIST(state, payload) {
      state.todoList = payload
    },

    ADD_TODO_ITEM(state, payload) {
      state.todoList.push(payload)
    },

    TOGGLE_TODO_ITEM(state, idx) {
      const el = { ...state.todoList[idx] }
      if (el) {
        el.isCompleted = !el.isCompleted
        state.todoList.splice(idx, 1, el)
      }
    },

    EDIT_TODO_ITEM(state, payload) {
      const idx = state.todoList.findIndex((el) => el.created_at === payload.id)
      if (idx !== -1) {
        const editedEl = { ...state.todoList[idx], title: payload.title }
        state.todoList.splice(idx, 1, editedEl)
      }
    },

    DELETE_TODO_ITEM(state, idx) {
      state.todoList.splice(idx, 1)
    },
  },
  actions: {},
  modules: {},
})
