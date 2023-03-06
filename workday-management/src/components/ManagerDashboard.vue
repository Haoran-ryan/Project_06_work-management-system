<script setup>
import TutorsManagement from "./TutorsManagement.vue";
import { ref, watch } from "vue";

const displayCreateForm = ref(false);
</script>

<template>
  <div>
    <div>
      <h1>Manager Dashboard coming</h1>
      <div class="tutor-buttons">
        <button @click="displayCreateForm = true">Add Tutor</button>
        <button @click="displayCreateForm = false">List Tutors</button>
      </div>
    </div>
    <TutorsManagement :displayCreateForm="displayCreateForm" />
  </div>
</template>
