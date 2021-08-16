<template>
  <div>
    <q-input
      type="text"
      :model-value="title"
      label="Titel"
      placeholder="Mein neuer Post"
      :rules="[(val) => val.length >= 3 || 'Muss mindestens 3 Zeichen lang sein.']"
      @update:model-value="(t) => emit('update:title', t)"
    />
    <csv-input
      v-model="cTags"
      label="Post-Tags, kommagetrennt"
      the-placeholder="Cooler Tag 1, Noch ein cooler Tag"
    />
    <csv-input
      v-model="cCats"
      label="Post-Kategorien, kommagetrennt"
      the-placeholder="Kategorie 1, Kategorie 2, ..."
    />
    <div class="q-gutter-md flex flex-center q-my-md">
      <q-file
        accept="image/*"
        :multiple="false"
        borderless
        hint="Hier klicken um das Post-Titelbild zu ändern."
        :input-style="{ display: 'none' }"
        :error="cover.length === 0"
        error-message="Ein Post muss ein Cover-Bild haben."
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
