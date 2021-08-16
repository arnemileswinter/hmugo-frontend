<template>
  <q-page padding>
    <q-btn
      color="positive"
      class="full-width q-mb-md"
      @click="router.push('/posts/create')"
    >
      Neuer Post
    </q-btn>
    <div :style="{ minHeight: '500px' }">
      <q-list bordered separator>
        <q-item
          v-for="post in posts"
          :key="post.id"
          v-ripple
          clickable
          :to="`/posts/${post.id}`"
        >
          <q-item-label>{{ post.title }}</q-item-label>
        </q-item>
      </q-list>
      <q-inner-loading :showing="fetchingPosts" />
    </div>
    <div class="flex flex-center">
      <q-pagination
        :model-value="currentPage + 1"
        :max="numPages"
        input
        @update:model-value="(i) => updateCurrentPage(i - 1)"
      />
    </div>
  </q-page>
</template>

<script setup>
import { ref, getCurrentInstance, onMounted } from "vue";

const api = getCurrentInstance().proxy.$api;

const router = getCurrentInstance().proxy.$router;

const postsPerPage = 10;
const numPages = ref(1);
const currentPage = ref(0);
const updateCurrentPage = (i) => {
  currentPage.value = i;
  fetchPosts(currentPage.value);
};

const fetchingPosts = ref(false);
const posts = ref([]);
const fetchPosts = (page) => {
  fetchingPosts.value = true;
  api
    .get("/v1/posts", { params: { offset: page, limit: postsPerPage } })
    .then((r) => {
      numPages.value = Math.max(r.data.pages, 1);
      posts.value = r.data.posts;
    })
    .catch(console.err)
    .finally(() => (fetchingPosts.value = false));
};

onMounted(() => fetchPosts(currentPage.value));
</script>
