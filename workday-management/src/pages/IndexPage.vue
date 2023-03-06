<script setup>
import { onMounted, ref } from "vue";
import Account from "/src/components/Account.vue";
import AuthNew from "/src/components/AuthNew.vue";
import { supabase } from "/src/lib/supabaseClient";

const session = ref();

onMounted(() => {
  supabase.auth.getSession().then(({ data }) => {
    session.value = data.session;
  });

  supabase.auth.onAuthStateChange((_, _session) => {
    session.value = _session;
  });
});
</script>

<template>
  <div class="container" style="padding: 50px 0 100px 0">
    <Account v-if="session" :session="session" />
    <AuthNew v-else />
  </div>
</template>
