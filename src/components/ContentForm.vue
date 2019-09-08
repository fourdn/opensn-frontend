<template>
  <div id="contentForm">
    <form @submit.prevent="handleSubmit">
      <label>Content Title</label>
      <input
        ref="first"
        type="text"
        :class="{ 'has-error': submitting && invalidTitle }"
        v-model="content.title"
        @focus="clearStatus"
        @keypress="clearStatus"
      />
      <label>Content Body</label>
      <input
        type="text"
        :class="{ 'has-error': submitting && invalidBody }"
        v-model="content.body"
        @focus="clearStatus"
      />
      <p v-if="error && submitting" class="error-message">
        Please fill out all required fields
      </p>
      <p v-if="success" class="success-message">Content added</p>
      <button>Add Content</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "ContentForm",
  data() {
    return {
      error: false,
      submitting: false,
      success: false,
      content: {
        title: "",
        body: ""
      }
    };
  },
  computed: {
    invalidTitle() {
      return this.content.title === "";
    },
    invalidBody() {
      return this.content.body === "";
    }
  },
  methods: {
    handleSubmit() {
      this.clearStatus();
      this.submitting = true;
      if (this.invalidTitle || this.invalidBody) {
        this.error = true;
        return;
      }
      this.$emit("addContent", this.content);
      this.$refs.first.focus();
      this.content = {
        title: "",
        body: ""
      };
      this.success = true;
      this.error = false;
      this.submitting = false;
    },
    clearStatus() {
      this.success = false;
      this.error = false;
    }
  }
};
</script>

<style scoped>
form {
  margin-bottom: 2rem;
}

.error-message {
  color: #d33e15;
  font-weight: 500;
}

.success-message {
  color: #1aa96e;
  font-weight: 500;
}
</style>
