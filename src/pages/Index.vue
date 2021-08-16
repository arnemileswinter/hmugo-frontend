<template>
  <q-page padding class="text-center">
    <div>
      <img alt="Hmugo logo" src="~assets/hmugo.svg" style="width: 200px; height: 200px" />
    </div>
    <q-badge color="secondary">
      <a
        target="_blank"
        href="https://buymeacoffee.com/arnemcnuggets"
        class="text-bold text-black"
      >
        <q-icon name="coffee" /> Buy me a coffee
      </a>
    </q-badge>

    <p>
      <b>Hmugo</b> (Hit Me Up, Hugo) is an easy-to-use blogging app for content
      administration with <b><a target="_blank" href="https://gohugo.io/">Hugo</a></b
      >. <br />
      The project was created to let non-technical users write statically generated blogs,
      leveraging Hugo's simplicity, speed and flexibility.<br />
      While Hugo makes <b>building websites</b> fun again, Hmugo makes
      <b>maintaining content</b> fun as well.
    </p>

    <p>
      Hmugo has been tested and developed with the
      <a target="_blank" href="https://github.com/g1eny0ung/hugo-theme-dream">Dream</a>
      theme by <a target="_blank" href="https://github.com/g1eny0ung">g1eny0ung</a>.
      <br />
      Using a different theme is certainly possible, but not aim of this project.<br />
      If you have not set up your blog yourself and wish to change themes, please ask your
      site administrator.
    </p>

    <p>
      Hugo is distributed under the
      <a target="_blank" href="https://github.com/gohugoio/hugo/blob/master/LICENSE"
        >Apache 2.0 License</a
      >. No changes were made to the original source code.
    </p>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "PageIndex",
});
</script>
