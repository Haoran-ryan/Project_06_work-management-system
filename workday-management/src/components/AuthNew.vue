<script setup>
import { ref } from "vue";
import { supabase } from "/src/lib/supabaseClient";

const loading = ref(false);
const email = ref("");
const password = ref("");
const isSignUp = ref(true);

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
    <form
      v-if="isSignUp"
      class="row flex-center flex"
      @submit.prevent="handleLogin"
    >
      <div class="col-5 form-widget flex flex-center">
        <h3 class="header">Supabase + Vue 3</h3>
        
        
        <div class="flex flex-center column q-pt-m">
        <div>
          <p class="description">Sign In</p>
        </div>
        <div>
          <input
            class="inputField"
            required
            type="email"
            placeholder="Your email"
            v-model="email"
          />
          </div>
          <div>
          <input
            type="password"
            required
            placeholder="Your password"
            v-model="password"
          />
          </div>
          <div>
          <button type="submit" class="q-mt-md">Sign in</button>
        </div>
        </div>
        

        
      </div>
    </form>
    <form v-else class="row flex-center flex" @submit.prevent="handleSignup">
      <div class="col-5 form-widget flex flex-center">
        <h3 class="header">Supabase + Vue 3</h3>
        
        <div class="flex flex-center column q-pt-m">
          <div>
          <p class="description">Sign Up</p>
          </div>
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
        
      </div>
      <div>
          <button type="submit" class="q-mt-md">Sign up</button>
        </div>
    </form>

    <div class="flex flex-center">
      <button @click="isSignUp = !isSignUp" class="q-mt-l">
        {{
          isSignUp
            ? "Don't have an account yet? Sign Up"
            : "Already have an account? Sign In"
        }}
      </button>
    </div>
    
  </div>
</template>
