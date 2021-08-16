<template>
  <q-page padding>
    <network-dependent :failed="netFailed" :pending="netPending">
      <post-info-editor
        v-model:title="title"
        v-model:cover="coverb64"
        v-model:categories="categories"
        v-model:tags="tags"
      />
      <content-editor v-model="content" />

      <save-button v-if="isNewPost" @click="() => savePost()" />
      <div v-else>
        <save-or-discard-buttons
          @click:save="() => savePost(postID)"
          @click:discard="() => fetchPost(postID)"
        />
        <delete-button @click="() => deletePost(postID)" />
      </div>
    </network-dependent>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted, defineProps, watch, getCurrentInstance } from "vue";
import NetworkDependent from "components/NetworkDependent";
import PostInfoEditor from "components/PostInfoEditor";
import ContentEditor from "components/ContentEditor";
import SaveButton from "components/form/SaveButton";
import DeleteButton from "components/form/DeleteButton";
import SaveOrDiscardButtons from "components/form/SaveOrDiscardButtons";
import PostCoverPlaceholderImage from "assets/post-cover-placeholder.png";

const api = getCurrentInstance().proxy.$api;
const props = defineProps({
  postID: {
    type: String,
    required: true,
  },
});

const isNewPost = computed(() => props.postID == "create");

const title = ref("");
const tags = ref([]);
const categories = ref([]);
const coverb64 = ref(PostCoverPlaceholderImage.replace(/^data:.+;base64,/, ""));
const content = ref([]);

const resetForm = () => {
  title.value = "";
  tags.value = [];
  categories.value = [];
  coverb64.value = PostCoverPlaceholderImage.replace(/^data:.+;base64,/, "");
  content.value = [];
};

const netFailed = ref(false);
const netPending = ref(false);
const fetchPost = (postID) => {
  netPending.value = true;
  api
    .get(`/v1/posts/${postID}`)
    .then((r) => {
      title.value = r.data.title;
      tags.value = r.data.tags;
      categories.value = r.data.categories;
      coverb64.value = r.data.cover;
      content.value = r.data.content;
    })
    .catch(() => (netFailed.value = true))
    .finally(() => {
      netPending.value = false;
    });
};

watch(
  () => props.postID,
  () => {
    resetForm();
    if (!isNewPost.value) {
      fetchPost(props.postID);
    }
  }
);

onMounted(() => {
  if (!isNewPost.value) {
    fetchPost(props.postID);
  }
});

const q = getCurrentInstance().proxy.$q;
const router = getCurrentInstance().proxy.$router;
const savePost = (postID) => {
  netPending.value = true;
  let saveFun = (...args) => api.post("/v1/posts", ...args);
  if (postID && postID != "0") {
    saveFun = (...args) => api.put(`/v1/posts/${postID}`, ...args);
  }
  saveFun({
    title: title.value,
    tags: tags.value,
    categories: categories.value,
    image: coverb64.value,
    content: content.value,
  })
    .then((r) => {
      q.notify({ type: "positive", message: "Gespeichert." });
      if (isNewPost.value) {
        router.replace(`/posts/${r.data.id}`);
      }
    })
    .catch((e) => {
      console.err(e);
      netFailed.value = true;
    })
    .finally(() => (netPending.value = false));
};

const deletePost = (postID) => {
  netPending.value = true;
  api
    .delete(`/v1/posts/${postID}`)
    .then(() => {
      router.replace("/posts");
    })
    .catch((e) => {
      netFailed.value = true;
      console.err(e);
    })
    .finally(() => (netPending.value = false));
};
</script>
