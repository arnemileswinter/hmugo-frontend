<template>
  <div>
    <q-input
      type="text"
      :model-value="title"
      label="Title"
      placeholder="My new post"
      :rules="[(val) => val.length >= 3 || 'Must be at least 3 characters.']"
      @update:model-value="(t) => emit('update:title', t)"
    />
    <csv-input
      v-model="cTags"
      label="Post-Tags, separated by commas"
      the-placeholder="cool tag 1, another tag"
    />
    <csv-input
      v-model="cCats"
      label="Post-Categories, separated by commas"
      the-placeholder="Categorie 1, Categorie 2, ..."
    />
    <div class="q-gutter-md flex flex-center q-my-md">
      <q-file
        accept="image/*"
        :multiple="false"
        borderless
        hint="Click here to change the post's cover image."
        :input-style="{ display: 'none' }"
        :error="cover.length === 0"
        error-message="Your post must have a cover-image."
        @update:model-value="coverChanged"
      >
        <template #default>
          <q-avatar square size="20em">
            <img :src="'data:image/jpg;base64,' + cover" />
          </q-avatar>
        </template>
      </q-file>
    </div>
  </div>
</template>

<script setup>
import { defineEmits, defineProps, computed } from "vue";
import csvInput from "components/CSVInput";

const emit = defineEmits([
  "update:title",
  "update:tags",
  "update:cover",
  "update:categories",
]);

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  cover: {
    type: String,
    required: true,
  },
  categories: {
    type: Array,
    required: true,
  },
  tags: {
    type: Array,
    required: true,
  },
});

const cTags = computed({
  get: () => props.tags,
  set: (v) => emit("update:tags", v),
});

const cCats = computed({
  get: () => props.categories,
  set: (v) => emit("update:categories", v),
});

const coverChanged = (newImgFile) => {
  const fileReader = new FileReader();
  fileReader.onloadend = () => {
    const b64 = fileReader.result.replace(/^data:.+;base64,/, "");
    emit("update:cover", b64);
  };
  fileReader.readAsDataURL(newImgFile);
};
</script>
