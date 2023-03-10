<template>
  <q-layout view="lHh Lpr lFf" class="bg-white">
    <q-header elevated>
      <q-toolbar class="bg-indigo-6">
        <q-btn
          flat
          dense
          round
          @click="toggleLeftDrawer"
          aria-label="Menu"
          icon="menu"
        />

        <q-toolbar-title> Tutonet </q-toolbar-title>
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
        <q-item clickable rel="noopener" to="/manager" v-if="loggedIn">
          <q-item-section avatar>
            <q-icon name="code" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Tutor Management</q-item-label>
            <q-item-label caption>Manage the tutors</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable rel="noopener" to="/timetable" v-if="loggedIn">
          <q-item-section avatar>
            <q-icon name="chat" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Class Management</q-item-label>
            <q-item-label caption>Manage all the current classes</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable rel="noopener" to="/courses" v-if="loggedIn">
          <q-item-section avatar>
            <q-icon name="rss_feed" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Course Management</q-item-label>
            <q-item-label caption>Manage all the courses</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable rel="noopener" to="/announcements" v-if="loggedIn">
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
import { ref, onMounted } from "vue";
import { store } from "src/store.js";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "vue-router";

export default {
  name: "MainLayout",

  setup() {
    const router = useRouter();
    const leftDrawerOpen = ref(false);
    const loggedIn = ref(null);

    function toggleLeftDrawer() {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    }

    // we initially verify if a user is logged in with Supabase
    const getSession = async () => {
      store.state.user = await supabase.auth.getSession();
      if (store.state.user && store.state.user.data.session !== null) {
        loggedIn.value = true;
      }

      // console.log(store.state.user, "before being assigned !!");

      // we then set up a listener to update the store when the user changes either by logging in or out
      supabase.auth.onAuthStateChange((event, session) => {
        if (event == "SIGNED_OUT") {
          store.state.user = null;
          loggedIn.value = false;
          console.log(loggedIn.value, "IF...");
        } else {
          loggedIn.value = true;
          store.state.user = session.user;
          console.log(loggedIn.value, "ELSE....");
          router.push("/");
        }
      });
    };
    onMounted(getSession);

    return {
      leftDrawerOpen,
      toggleLeftDrawer,
      // store,
      loggedIn,
    };
  },
};
</script>
