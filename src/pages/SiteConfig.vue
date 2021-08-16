<template>
  <q-page padding>
    <network-dependent :failed="failed" :pending="pending">
      <div class="q-gutter-y-md column">
        <q-input
          v-model="header"
          filled
          label="Header"
          hint="Das ist der Titel, der auf der Hauptseite fettgedruckt ist. Der sollte eher kurz sein."
        />
        <q-input
          v-model="motto"
          filled
          type="textarea"
          label="Motto"
          hint="Das ist der Untertitel, der darf ein bisschen Länger sein."
        />
        <q-input
          v-model="footerText"
          filled
          type="textarea"
          hint="Dieser Text wird ganz unten auf deiner Seite angezeigt. Hier kann rechtlicher Krams rein."
        />
        <q-input
          v-model="baseURL"
          filled
          hint="Die internetadresse deines Blogs. Falls du deine Seite nicht selbst aufgesetzt hast, solltest du diese nicht ändern."
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
      q.notify({ type: "positive", message: "Gespeichert." });
    })
    .catch((e) => {
      console.err(e);
      failed.value = true;
    })
    .finally(() => (pending.value = false));
};
</script>
