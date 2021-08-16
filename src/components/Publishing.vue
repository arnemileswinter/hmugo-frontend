<template>
  <q-btn
    :disabled="!hasChanges"
    :color="(failed && 'negative') || (hasChanges && 'positive') || 'primary'"
    :class="hasChanges && 'animated heartBeat slower'"
    :loading="pending"
    @click="publish"
  >
    Veröffentlichen
  </q-btn>
</template>
<script setup>
import { onMounted, onUnmounted, getCurrentInstance, ref } from "vue";

const api = getCurrentInstance().proxy.$api;

const hasChanges = ref(false);

const pending = ref(true);
const failed = ref(false);
const findChanges = () => {
  pending.value = true;
  failed.value = false;
  api
    .get("/v1/blog/changes")
    .then((r) => {
      // 204 is returned when no changes are on site.
      hasChanges.value = r.status !== 204;
    })
    .catch((e) => {
      failed.value = true;
      console.error(e);
    })
    .finally(() => {
      pending.value = false;
    });
};

const publish = () => {
  pending.value = true;
  failed.value = false;
  api
    .post("/v1/blog/publish")
    .then(findChanges) // pending state is reset withing this.
    .catch((e) => {
      failed.value = true;
      pending.value = false;
      console.error(e);
    });
};

onMounted(() => {
  document.addEventListener("siteupdate", findChanges);
  findChanges();
});
onUnmounted(() => document.removeEventListener("siteupdate", findChanges));
</script>
