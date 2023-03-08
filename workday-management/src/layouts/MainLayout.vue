<template>
  <q-layout view="lHh Lpr lFf" class="bg-white">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="toggleLeftDrawer"
          aria-label="Menu"
          icon="menu"
        />

        <q-toolbar-title> Quasar App </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="bg-grey-2">
      <q-list>
        <q-item-label header>Dashboard Navigation</q-item-label>
        <q-item clickable rel="noopener" to="/">
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Home</q-item-label>
            <q-item-label caption
              >Return to the homepage to Sign up or sign in</q-item-label
            >
          </q-item-section>
        </q-item>
        <q-item clickable rel="noopener" to="/manager">
          <q-item-section avatar>
            <q-icon name="code" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Tutor Management</q-item-label>
            <q-item-label caption>Manage the tutors</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable rel="noopener" to="/timetable">
          <q-item-section avatar>
            <q-icon name="chat" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Classe Management</q-item-label>
            <q-item-label caption>Manage all the current classes</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable rel="noopener" to="/courses">
          <q-item-section avatar>
            <q-icon name="rss_feed" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Course Management</q-item-label>
            <q-item-label caption>Manage all the courses</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable rel="noopener" to="/announcements">
          <q-item-section avatar>
            <q-icon name="record_voice_over" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Annoncements</q-item-label>
            <q-item-label caption>something to say ....</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable rel="noopener" href="https://facebook.quasar.dev">
          <q-item-section avatar>
            <q-icon name="public" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Facebook</q-item-label>
            <q-item-label caption>@QuasarFramework</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import { store } from "src/store.js";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "vue-router";

export default {
  name: "MainLayout",

  setup() {
    const router = useRouter();
    const leftDrawerOpen = ref(false);

    function toggleLeftDrawer() {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    }

    // we initially verify if a user is logged in with Supabase
    const getSession = async () => {
      store.state.user = await supabase.auth.getSession();
    };
    getSession();
    // we then set up a listener to update the store when the user changes either by logging in or out
    supabase.auth.onAuthStateChange((event, session) => {
      if (event == "SIGNED_OUT") {
        store.state.user = null;
      } else {
        store.state.user = session.user;
        router.push("/");
      }
    });

    return {
      leftDrawerOpen,
      toggleLeftDrawer,
      store,
    };
  },
};
</script>
