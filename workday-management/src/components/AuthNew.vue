<script setup>
import { ref } from "vue";
import { supabase } from "/src/lib/supabaseClient";

const loading = ref(false);
const email = ref("");
const password = ref("");
const isSignUp = ref(true);

console.log("isSignUp: ", isSignUp.value);

const handleLogin = async () => {
  try {
    loading.value = true;
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });
    if (error) throw error;
    alert("Welcome back!");
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    }
  } finally {
    loading.value = false;
  }
};

const handleSignup = async () => {
  try {
    // Use the Supabase provided method to handle the signup
    const { user, session, error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
    });
    if (error) throw error;
    isSignUp.value = true; // update singup status
  } catch (error) {
    alert(error.error_description || error.message);
  }
};
</script>

<template>
  <div>
    <button @click="isSignUp = !isSignUp">
      {{
        isSignUp
          ? "Already have an account? Sign In"
          : "Don't have an account yet? Sign Up"
      }}
    </button>
    <form
      v-if="isSignUp"
      class="row flex-center flex"
      @submit.prevent="handleLogin"
    >
      <div class="col-6 form-widget">
        <h3 class="header">Supabase + Vue 3</h3>
        <p class="description">Sign In</p>
        <div>
          <input
            class="inputField"
            required
            type="email"
            placeholder="Your email"
            v-model="email"
          />
          <input
            type="password"
            required
            placeholder="Your password"
            v-model="password"
          />
        </div>
        <div>
          <button type="submit">Sign in</button>
        </div>
      </div>
    </form>
    <form v-else class="row flex-center flex" @submit.prevent="handleSignup">
      <div class="col-6 form-widget">
        <h3 class="header">Supabase + Vue 3</h3>
        <p class="description">Sign Up</p>
        <div>
          <input
            class="inputField"
            required
            type="email"
            placeholder="Your email"
            v-model="email"
          />
          <input
            type="password"
            required
            placeholder="Your password"
            v-model="password"
          />
        </div>
        <div>
          <button type="submit">Sign up</button>
        </div>
      </div>
    </form>
  </div>
</template>
