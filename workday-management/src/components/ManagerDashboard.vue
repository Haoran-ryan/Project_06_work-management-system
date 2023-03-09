<script setup>
import TutorsManagement from "./TutorsManagement.vue";
import { ref, watch } from "vue";

const displayCreateForm = ref(false);
</script>

<template>
  <div>
    <div class="column flex-center">
      <h3>Tutor Management</h3>
      <p>Click the button to add a new tutor or list all tutors</p>
      <div class="tutor-buttons">
        <button @click="displayCreateForm = !displayCreateForm">
          {{ displayCreateForm ? "All Tutors" : "Add a Tutor" }}
        </button>
      </div>
    </div>
    <TutorsManagement :displayCreateForm="displayCreateForm" />
  </div>
</template>
