<template>
  <div id="app">
    <h1>Contents</h1>

    <ContentForm @addContent="addContent" />
    <div id="content-table">
      <p v-if="contentList.length < 1" class="empty-table">
        No content yet
      </p>
      <table v-else>
        <thead>
          <tr>
            <th>Date</th>
            <th></th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr :key="content.id" v-for="content in contentList">
            <td>{{ content.date }}</td>
            <td v-if="editing === content.id">
              <input type="text" v-model="content.body" />
            </td>
            <td
              class="selfContent"
              v-else-if="this.currentUser.login === content.author.login"
            >
              <h3>{{ content.title }}</h3>
              {{ content.body }}
            </td>
            <td v-else>
              <h3>{{ content.title }}</h3>
              {{ content.body }}
            </td>
            <td v-if="editing === content.id">
              <button @click="editContent(content)">Save</button>
              <button class="muted-button" @click="cancelEdit(content)">
                Cancel
              </button>
            </td>
            <td v-else>
              <button @click="editMode(content)">Edit</button>
              <button @click="deleteContent(content.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import ContentForm from "@/components/ContentForm";

export default {
  name: "ContentList",
  data() {
    return {
      editing: null,
      contentList: []
    };
  },
  components: {
    ContentForm
  },
  props: {
    currentUser: Object
  },
  mounted() {
    this.getContent();
  },
  methods: {
    async getContent() {
      try {
        const response = await fetch("./content");
        this.contentList = await response.json();
      } catch (error) {
        console.error(error);
      }
    },
    async addContent(content) {
      try {
        const response = await fetch("./content", {
          method: "POST",
          body: JSON.stringify(content),
          headers: { "Content-type": "application/json; charset=UTF-8" }
        });
        const data = await response.json();
        this.contentList = [...this.contentList, data];
      } catch (error) {
        console.error(error);
      }
    },
    async updateContent(id, updatedContent) {
      try {
        const response = await fetch(`./content/${id}`, {
          method: "PUT",
          body: JSON.stringify(updatedContent),
          headers: { "Content-type": "application/json; charset=UTF-8" }
        });
        const data = await response.json();
        this.contentList = this.contentList.map(content =>
          content.id === id ? data : content
        );
      } catch (error) {
        console.error(error);
      }
    },
    async deleteContent(id) {
      try {
        await fetch(`./content/${id}`, {
          method: "DELETE"
        });
        this.contentList = this.contentList.filter(
          content => content.id !== id
        );
      } catch (error) {
        console.error(error);
      }
    },
    editMode(content) {
      this.cachedContent = Object.assign({}, content);
      this.editing = content.id;
    },
    cancelEdit(content) {
      Object.assign(content, this.cachedContent);
      this.editing = null;
    },
    editContent(content) {
      if (content.name === "" || content.email === "") return;
      this.updateContent(content.id, content);
      this.editing = null;
    }
  }
};
</script>

<style scoped>
button {
  margin: 0 0.5rem 0 0;
  background: #009435;
  border: 1px solid #009435;
}

button:hover,
button:active,
button:focus {
  background: #32a95d;
  border: 1px solid #32a95d;
}

input {
  margin: 0;
}

.empty-table {
  text-align: center;
}

.selfContent {
  background-color: #afd39e;
}
</style>
