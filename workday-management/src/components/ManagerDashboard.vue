<script setup>
import TutorsManagement from "./TutorsManagement.vue";
import { ref, watch } from "vue";

const displayCreateForm = ref(false);
</script>

<template>
  <div>
    <div>
      <h3>Tutor Management</h3>
      <p>Click the button to add a new tutor or list all tutors</p>
      <div class="tutor-buttons">
        <button @click="displayCreateForm = !displayCreateForm">
          {{ displayCreateForm ? "Add A Tutor" : "List All Tutors" }}
        </button>
      </div>
    </div>
    <TutorsManagement :displayCreateForm="displayCreateForm" />
  </div>
</template>
