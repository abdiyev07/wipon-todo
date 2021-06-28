<template>
  <section class="add-todo">
    <h4 class="add-todo__title">Новая задача</h4>
    <form class="add-todo__form" @submit.prevent="onSubmit">
      <textarea class="add-todo__textarea" v-model.trim="title" placeholder="Описание задачи" required />
      <div class="add-todo__form-buttons">
        <button class="button success-button" type="submit">Добавить</button>
        <button class="button" @click="goBack">Отмена</button>
      </div>
    </form>
  </section>
</template>

<script>
export default {
  name: 'AddTodo',
  data: () => ({
    title: '',
  }),

  methods: {
    onSubmit() {
      if (!this.title.length) return
      this.$store.commit('ADD_TODO_ITEM', {
        title: this.title,
        isCompleted: false,
        created_at: Date.now(),
      })
      this.goBack()
    },

    goBack() {
      this.$router.push({ name: 'Home' })
    },
  },
}
</script>
