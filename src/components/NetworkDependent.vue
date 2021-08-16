<template>
  <div>
    <div v-if="failed">Da ist was schief gelaufen. Frag mal Arne, sorry :)</div>
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
