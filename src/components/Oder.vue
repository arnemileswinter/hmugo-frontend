<template>
  <div class="oder">Or</div>
</template>

<style lang="scss" scoped>
.oder {
  display: flex;
  align-items: center;
  font-weight: bold;
  text-transform: uppercase;
  color: $grey-8;
}
.oder::before,
.oder::after {
  display: block;
  content: "";
  min-width: 2em;
  min-height: 0.2em;
  background: $grey-13;
  margin-right: 0.25em;
  margin-left: 0.25em;
}
</style>
