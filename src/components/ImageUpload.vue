<template>
  <q-uploader
    :headers="uploadHeaders"
    :url="uploadUrl"
    :method="apiMethod"
    :label="label"
    accept="image/*"
    max-files="1"
    @uploaded="$emit('uploaded')"
    @failed="$emit('failed')"
  />
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

defineEmits(["uploaded", "failed"]);
const props = defineProps({
  apiPath: {
    type: String,
    required: true,
  },
  apiMethod: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: false,
    default: "Bild hinzufügen",
  },
});

const uploadUrl = process.env.VUE_APP_API_URL + props.apiPath;
const uploadHeaders = [
  { name: "Authorization", value: "Bearer " + process.env.VUE_APP_API_KEY },
];
</script>
