<template>
  <section class="add-todo">
    <h4 class="add-todo__title">Редактировать задачу</h4>
    <form v-if="isFind" class="add-todo__form" @submit.prevent="onSubmit">
      <textarea class="add-todo__textarea" v-model.trim="title" placeholder="Описание задачи" required />
      <div class="add-todo__form-buttons">
        <button class="button success-button" type="submit">Сохранить</button>
        <button class="button" @click="goBack">Отмена</button>
      </div>
    </form>
    <p v-else class="not-found">Задача с ID {{ $route.params.id }} не найдена...</p>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'EditTodo',
  data: () => ({
    title: '',
    startedTitle: '',
    isFind: false,
  }),

  computed: {
    ...mapState({
      todos: (state) => state.todoList,
    }),
  },

  created() {
    this.synchTodo()
  },

  methods: {
    onSubmit() {
      if (!this.title.length) return
      if (this.title === this.startedTitle) {
        return this.goBack()
      }

      this.$store.commit('EDIT_TODO_ITEM', {
        title: this.title,
        id: this.$route.params.id,
      })
      this.goBack()
    },

    goBack() {
      this.$router.push({ name: 'Home' })
    },

    synchTodo() {
      const id = this.$route.params.id
      const todo = this.todos.find((el) => el.created_at == id)
      if (!todo) {
        return (this.isFind = false)
      }
      this.isFind = true
      this.startedTitle = todo.title
      this.title = todo.title
    },
  },
}
</script>
