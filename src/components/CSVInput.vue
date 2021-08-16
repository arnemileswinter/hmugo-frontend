<template>
  <q-input
    v-model="txt"
    type="text"
    :placeholder="modelValue.length == 0 ? thePlaceholder : ''"
    @keyup="onKeyUp"
    @keydown="onKeyDown"
    @blur="updateTags"
  >
    <template #prepend>
      <q-chip
        v-for="(v, idx) in modelValue"
        :key="`csv-chip-${idx}`"
        removable
        dense
        @remove="() => dropTag(idx)"
      >
        {{ v }}
      </q-chip>
    </template>
  </q-input>
</template>
<script setup>
import { defineProps, defineEmits, ref } from "vue";

const txt = ref("");

const emit = defineEmits(["update:model-value"]);
const emitUpdate = (what) => emit("update:model-value", what);

const props = defineProps({
  modelValue: {
    type: Array,
    required: true,
  },
  allowDuplicates: {
    type: Boolean,
    default: false,
  },
  thePlaceholder: {
    type: String,
    default: "",
  },
});

const onKeyDown = (e) => {
  if (e.key == "Backspace" && txt.value == "") {
    dropLastTag();
  }
};

const onKeyUp = (e) => {
  if (e.key == ",") {
    updateTags();
  }
};

const dropTag = (idx0) => {
  emitUpdate(props.modelValue.filter((i, idx) => idx !== idx0));
};

const dropLastTag = () => {
  emitUpdate(props.modelValue.filter((i, idx) => idx !== props.modelValue.length - 1));
};

const updateTags = () => {
  if (txt.value.trim() == "") {
    return;
  }
  const ts = txt.value.split(",").map((t) => t.trim());
  txt.value = "";
  // double negation, getting rid of falsey string values. namely the empty string.
  const newVal = [...props.modelValue, ...ts].filter((v) => !!v);
  emitUpdate(newVal);
};
</script>
