<script setup>
import TutorsManagement from "./TutorsManagement.vue";
import { ref, watch } from "vue";

const displayCreateForm = ref(false);
// const diplayActiveTutors = ref(false);
</script>

<template>
  <div>
    <div class="column flex-center">
      <h3>Tutor Management</h3>
      <p>Click the button to add a new tutor or list all tutors</p>
      <div class="tutor-buttons">
        <button class="bg-blue-8" @click="displayCreateForm = !displayCreateForm">
          {{ displayCreateForm ? "All Tutors" : "Add a Tutor" }}
        </button>
        <!-- <button @click="diplayActiveTutors = !diplayActiveTutors">
          {{ diplayActiveTutors ? "All Tutors" : "Current Tutors Only" }}
        </button> -->
      </div>
    </div>
    <TutorsManagement :displayCreateForm="displayCreateForm" />
  </div>
</template>
