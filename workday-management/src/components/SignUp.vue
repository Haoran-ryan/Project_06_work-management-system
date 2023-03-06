<template>
  <div>
    <h2>Sign up for an account</h2>
    <form @submit.prevent="handleSignup" v-if="!isSignUp">
      <div>
        <label for="email">Email</label>
        <input id="email" type="email" v-model="email" />
      </div>
      <div>
        <label for="password">Password</label>
        <input id="password" type="password" v-model="password" />
      </div>
      <div>
        <button type="submit">Sign up</button>
      </div>
    </form>
    <div v-if="isSignUp">
      You have successfully signed up! Please check your email for verification!
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { supabase } from "../lib/supabaseClient";

export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const isSignUp = ref(false); // add new variable

    const handleSignup = async () => {
      try {
        // Use the Supabase provided method to handle the signup
        const { user, session, error } = await supabase.auth.signUp({
          email: email.value,
          password: password.value,
        });
        if (error) throw error;

        // // Automatically sign in the user after a successful signup
        // await supabase.auth.signInWithPassword({
        //   email: email.value,
        //   password: password.value,
        // });
        isSignUp.value = true; // update singup status
      } catch (error) {
        alert(error.error_description || error.message);
      }
    };

    return {
      email,
      password,
      handleSignup,
      isSignUp,
    };
  },
};
</script>
