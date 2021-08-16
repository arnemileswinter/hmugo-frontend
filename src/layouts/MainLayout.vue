<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="text-primary bg-white">
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
        <q-avatar>
          <img src="~assets/hmugo.svg" />
        </q-avatar>
        <q-toolbar-title>
          <span class="cursor-pointer" @click="router.push('/')"> HMUGO </span>
        </q-toolbar-title>

        <publishing />
      </q-toolbar>
    </q-header>

    <q-footer class="bg-white text-black q-pa-xs">
      <div class="float-right">v{{ version }}</div>
    </q-footer>

    <q-drawer
      v-model="leftDrawerOpen"
      :width="250"
      show-if-above
      bordered
      class="bg-grey-1"
    >
      <q-list>
        <q-item-label header class="text-grey-8">Verwaltung</q-item-label>
        <q-item clickable to="/config">Seiteneinstellungen</q-item>
        <q-item clickable to="/profile">Profil</q-item>
        <q-item clickable to="/posts">Posts</q-item>
        <q-separator />
        <q-item><discard-changes /></q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, getCurrentInstance } from "vue";
import Publishing from "components/Publishing";
import DiscardChanges from "components/DiscardChanges";
const router = getCurrentInstance().proxy.$router;

const leftDrawerOpen = ref(false);
const toggleLeftDrawer = () => (leftDrawerOpen.value = !leftDrawerOpen.value);
const version = process.env.VUE_APP_VERSION;
</script>
