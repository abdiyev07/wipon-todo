<template>
  <div class="main__title-wrapper">
    <div class="main__title">
      <span class="main__title-text" ref="titleText" :contenteditable="isTitleEditable">{{ title }}</span>
      <span class="main__title-edit"
        ><svg
          v-show="!isTitleEditable"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-pencil-square"
          viewBox="0 0 16 16"
          @click="editTitle"
        >
          <path
            d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
          />
          <path
            fill-rule="evenodd"
            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
          /></svg
      ></span>
    </div>
    <button v-show="isTitleEditable" @click="saveTitle" class="button success-button main__title-save">Сохранить</button>
  </div>
</template>

<script>
export default {
  name: 'AppTitle',

  data: () => ({
    title: 'Список задач',
    isTitleEditable: false,
  }),

  mounted() {
    const title = localStorage.getItem('todo_title')
    if (!title) return
    this.title = title
  },

  methods: {
    editTitle() {
      this.isTitleEditable = true
      this.$nextTick(() => this.$refs.titleText.focus())
    },

    saveTitle() {
      this.title = this.$refs.titleText.innerText
      localStorage.setItem('todo_title', this.title)
      this.isTitleEditable = false
    },
  },
}
</script>
