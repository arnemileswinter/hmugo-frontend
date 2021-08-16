<template>
  <q-page padding>
    <network-dependent :failed="failed" :pending="pending">
      <div class="q-gutter-y-md column">
        <q-input
          v-model="header"
          filled
          label="Header"
          hint="This title will be printed bold on the main page. Keep it short."
        />
        <q-input
          v-model="motto"
          filled
          type="textarea"
          label="Motto"
          hint="Your blog's motto may be a bit longer."
        />
        <q-input
          v-model="footerText"
          filled
          type="textarea"
          hint="This is the bottom text of your page. A nice place for legal disclaimers etc."
        />
        <q-input
          v-model="baseURL"
          filled
          hint="Your blogs public internet adress. If you have not set up your site yourself, ignore this."
        />
      </div>
      <save-or-discard-buttons @click:save="saveChanges" @click:discard="fetchFields" />
    </network-dependent>
  </q-page>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from "vue";
import NetworkDependent from "components/NetworkDependent";
import SaveOrDiscardButtons from "components/form/SaveOrDiscardButtons";

const header = ref("");
const motto = ref("");
const baseURL = ref("");
const footerText = ref("");

const failed = ref(false);
const pending = ref(true);
const api = getCurrentInstance().proxy.$api;

const fetchFields = () => {
  pending.value = true;
  api
    .get("/v1/blog")
    .then((r) => {
      header.value = r.data.header;
      motto.value = r.data.motto;
      baseURL.value = r.data.baseURL;
      footerText.value = r.data.footerText;
    })
    .catch((e) => {
      console.err(e);
      failed.value = true;
    })
    .finally(() => (pending.value = false));
};
onMounted(fetchFields);

const q = getCurrentInstance().proxy.$q;
const saveChanges = () => {
  pending.value = true;
  api
    .put("/v1/blog", {
      header: header.value,
      motto: motto.value,
      footerText: footerText.value,
      baseURL: baseURL.value,
    })
    .then(() => {
      q.notify({ type: "positive", message: "Saved." });
    })
    .catch((e) => {
      console.err(e);
      failed.value = true;
    })
    .finally(() => (pending.value = false));
};
</script>
