<template>
  <main class="main">
    <AppTitle />
    <div class="todo__filter">
      <select class="todo__filter-select" v-model="selected">
        <option :value="null">Показать все</option>
        <option :value="1">Показать активные</option>
        <option :value="2">Показать заврешенные</option>
      </select>
      <input class="todo__filter-input" v-model="filter" type="text" placeholder="Фильтр по названию" />
    </div>
    <div class="todo">
      <AppTodo v-for="(todo, idx) in filteredTodo" :key="todo.created_at" :todo="todo" :idx="idx" />
    </div>
  </main>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Home',

  components: {
    AppTitle: () => import('@/components/AppTitle'),
    AppTodo: () => import('@/components/AppTodo'),
  },

  data: () => ({
    selected: null,
    filter: '',
  }),

  computed: {
    ...mapState({
      todos: (state) => state.todoList,
    }),

    filteredByTitle() {
      if (!this.filter) return this.todos
      return this.todos.filter((el) => el.title.includes(this.filter))
    },

    filteredTodo() {
      if (!this.selected && !this.filter) return this.todos
      if (!this.selected) return this.filteredByTitle
      return this.filteredByTitle.filter((el) => {
        return this.selected === 1 ? !el.isCompleted : el.isCompleted
      })
    },
  },

  mounted() {
    window.addEventListener('beforeunload', this.saveTodoList)

    const todo = localStorage.getItem('todo')
    if (todo) {
      const parsedTodo = JSON.parse(todo)
      this.$store.commit('SET_TODO_LIST', parsedTodo.list)
      this.selected = parsedTodo.filters.selected
      this.filter = parsedTodo.filters.text
    }
  },

  methods: {
    saveTodoList() {
      localStorage.setItem(
        'todo',
        JSON.stringify({
          list: this.todos,
          filters: {
            text: this.filter,
            selected: this.selected,
          },
        })
      )
    },
  },
}
</script>
