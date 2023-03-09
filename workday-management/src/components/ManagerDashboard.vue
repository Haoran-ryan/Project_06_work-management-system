<script setup>
import TutorsManagement from "./TutorsManagement.vue";
import { ref, watch } from "vue";

const displayCreateForm = ref(false);
</script>

<template>
  <div>
    <div>
      <h4>Tutor Management</h4>
      <div class="tutor-buttons">
        <button @click="displayCreateForm = !displayCreateForm">
          {{ displayCreateForm ? "List All Tutors" : "Add A Tutor" }}
        </button>
      </div>
    </div>
    <TutorsManagement :displayCreateForm="displayCreateForm" />
  </div>
</template>
