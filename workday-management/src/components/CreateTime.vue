<script setup>
import { ref, toRefs, defineProps, onMounted, watch } from "vue";
import { supabase } from "../lib/supabaseClient";

const props = defineProps({
  createForm: Boolean,
});
const { createForm } = toRefs(props);
console.log(` child component - createForm`, createForm.value);
const newTime = {
  start_date: "",
  time: "",
  course: "",
  tutor_id: "",
};

watch(createForm, (newValue, oldValue) => {
  getAllTimes();
});
</script>
<template>
    <div v-if="!createForm"><p>no</p></div>
    <div v-if="createForm"><p>yes</p></div>
</template>
