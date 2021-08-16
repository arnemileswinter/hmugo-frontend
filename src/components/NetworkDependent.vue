<template>
  <div>
    <div v-if="failed">
      Something went wrong. 
      Feel free to file a bugreport at 
      <a target="_blank" href="https://github.com/arnemileswinter/hmugo/issues">GitHub</a>.
      </div>
    <slot />
    <q-inner-loading :showing="pending" />
  </div>
</template>
<script setup>
import { defineProps } from "vue";

defineProps({
  failed: {
    type: Boolean,
    required: true,
  },
  pending: {
    type: Boolean,
    required: true,
  },
});
</script>
