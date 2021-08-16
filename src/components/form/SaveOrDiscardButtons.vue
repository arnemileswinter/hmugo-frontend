<template>
  <div class="row save-or-discard">
    <div class="col col-sm-2 col-xs-12">
      <discard-button @click="emit('click:discard')">
        <slot name="discard"> Verwerfen </slot>
      </discard-button>
    </div>
    <div class="col col-sm-10 col-xs-12">
      <save-button @click="emit('click:save')">
        <slot name="save"> Speichern </slot>
      </save-button>
    </div>
  </div>
</template>

<script setup>
import { defineEmits } from "vue";
import SaveButton from "components/form/SaveButton";
import DiscardButton from "components/form/DiscardButton";

const emit = defineEmits(["click:discard", "click:save"]);
</script>

<style scoped lang="sass">
@media (max-width: $breakpoint-xs-max)
  .save-or-discard
    flex-direction: column-reverse
</style>
