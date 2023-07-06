<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { PAGE_NAME } from '@/constants/pages.constants.js';

const router = useRouter();

const isActivePage = ref(PAGE_NAME.Home);
const showMobileDialog = ref(false);

const openPage = (page) => {
  const routerPage = page === PAGE_NAME.Home ? '' : page;

  isActivePage.value = page;
  router.push(`/${routerPage}`);
};

const menuList = [
  {
    name: 'Home',
    value: PAGE_NAME.Home,
    isActive: (page) => isActivePage.value === page,
    action: (page) => openPage(page),
  },{
    name: 'Changed exchange rates',
    value: PAGE_NAME.Changed,
    isActive: (page) => isActivePage.value === page,
    action: (page) => openPage(page),
  },{
    name: 'Search exchange rates',
    value: PAGE_NAME.Search,
    isActive: (page) => isActivePage.value === page,
    action: (page) => openPage(page),
  },
];
</script>

<template>
  <v-app-bar color="indigo-lighten-5" name="app-bar">
    <v-container class="d-flex align-center">
      <v-toolbar-title
        class="cursor-pointer"
        @click="openPage(PAGE_NAME.Home)"
      >
        Exchange App
      </v-toolbar-title>

      <div class="d-none d-md-flex">
        <v-btn
          v-for="({name, value, isActive, action}, i) in menuList"
          :key="i"
          class="ml-1"
          :active="isActive(value)"
          @click="action(value)"
        >
          {{ name }}
        </v-btn>
      </div>

      <v-dialog
        v-model="showMobileDialog"
        :fullscreen="true"
        :scrim="false"
        transition="dialog-bottom-transition"
        close-on-content-click
      >
        <template #activator="{ props }">
          <v-btn icon class="d-md-none" v-bind="props">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-card elevation="0">
          <v-toolbar
            color="indigo-lighten-5"
          >
            <v-toolbar-title
              class="cursor-pointer"
              @click="openPage(PAGE_NAME.Home)"
            >
              Exchange App
            </v-toolbar-title>
          
            <v-spacer/>

            <v-btn
              icon
              dark
              @click="showMobileDialog = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
        
          <v-list>
            <v-list-item
              v-for="({name, value, isActive, action}, i) in menuList"
              :key="i"
              :value="value"
              :active="isActive(value)"
              @click="action(value)"
            >
              <v-list-item-title>{{ name }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-dialog>
    </v-container>
  </v-app-bar>
</template>
