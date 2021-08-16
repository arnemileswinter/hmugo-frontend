<template>
  <div>
    <div v-for="(item, idx) in modelValue" :key="`post-editor-${idx}`">
      <q-separator class="q-mb-md" />
      <div class="row q-mb-md">
        <div class="col col-xs-1">
          <q-btn
            icon="delete_forever"
            color="negative"
            dense
            @click="() => removeContent(idx)"
          />
        </div>
        <div class="col-xs-10">
          <q-input
            v-if="item.type === 'txt'"
            type="textarea"
            filled
            autogrow
            placeholder="Hier kannst du ein paar Worte schreiben."
            :model-value="item.val"
            @update:model-value="(i) => updateText(idx, i)"
          >
          </q-input>
          <div v-if="item.type === 'img'" class="flex flex-center">
            <q-file
              accept="image/*"
              hint="Bild ersetzen"
              borderless
              :input-style="{ display: 'none' }"
              item-aligned
              @update:model-value="(i) => updateImg(idx, i)"
            >
              <template #default>
                <q-avatar size="10em" square>
                  <img height="256" :src="'data:image/jpg;base64,' + item.val" />
                </q-avatar>
              </template>
            </q-file>
          </div>
        </div>
        <div class="col col-xs-1 self-center">
          <div v-if="idx !== 0" class="row">
            <q-btn icon="arrow_upward" dense @click="moveUp(idx)" />
          </div>
          <div v-if="idx !== modelValue.length - 1" class="row">
            <q-btn icon="arrow_downward" dense @click="moveDown(idx)" />
          </div>
          <div :style="{ minHeight: '1em' }" />
        </div>
      </div>
    </div>
    <q-btn-group spread class="q-mt-md">
      <q-btn @click="addTxt">Text</q-btn>
      <oder />
      <q-btn @click="addImg">Bild</q-btn>
    </q-btn-group>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";
import Oder from "components/Oder";
import { fileDialog } from "file-select-dialog";
const props = defineProps({
  modelValue: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["update:model-value"]);
const emitContentUpdate = (newContent) => emit("update:model-value", newContent);

const updateText = (contentIdx, txt) => {
  emitContentUpdate(
    props.modelValue.map((s, idx) => {
      if (idx !== contentIdx) {
        return s;
      } else {
        return { ...s, val: txt };
      }
    })
  );
};

const updateImg = (contentIdx, imFile) => {
  const fileReader = new FileReader();
  fileReader.onloadend = () => {
    const b64 = fileReader.result.replace(/^data:.+;base64,/, "");
    imageBeingAdded.value = false;
    emitContentUpdate(
      props.modelValue.map((s, idx) => {
        if (idx !== contentIdx) {
          return s;
        } else {
          return { ...s, val: b64 };
        }
      })
    );
  };

  fileReader.readAsDataURL(imFile);
};

const addTxt = () => {
  emitContentUpdate([...props.modelValue, { type: "txt", val: "" }]);
};

const imageBeingAdded = ref(false);
const fileReader = new FileReader();
const addImg = () => {
  if (imageBeingAdded.value) {
    fileReader.abort();
  }
  imageBeingAdded.value = true;
  fileDialog({ multiple: false, accept: "image/*", strict: true })
    .then((imgFile) => {
      fileReader.onloadend = () => {
        const b64 = fileReader.result.replace(/^data:.+;base64,/, "");
        imageBeingAdded.value = false;
        emitContentUpdate([...props.modelValue, { type: "img", val: b64 }]);
      };

      fileReader.readAsDataURL(imgFile);
    })
    .catch(console.err);
};

const removeContent = (idx0) => {
  emitContentUpdate(props.modelValue.filter((itm, idx) => idx !== idx0));
};

const moveUp = (idx0) => {
  if (idx0 === 0) {
    return;
  }
  const newContent = [...props.modelValue];

  const a = newContent[idx0 - 1];
  newContent[idx0 - 1] = newContent[idx0];
  newContent[idx0] = a;
  emitContentUpdate(newContent);
};
const moveDown = (idx0) => {
  if (idx0 === props.modelValue.length - 1) {
    return;
  }
  const newContent = [...props.modelValue];

  const a = newContent[idx0 + 1];
  newContent[idx0 + 1] = newContent[idx0];
  newContent[idx0] = a;
  emitContentUpdate(newContent);
};
</script>
