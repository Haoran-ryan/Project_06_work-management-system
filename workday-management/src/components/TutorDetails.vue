<template>
  <div>
    <div class="text-h4">{{ tutorData.name }}</div>
    <div class="text-subtitle">{{ tutorData.email }}</div>
    <div class="text-caption q-mt-md">Qualifications:</div>
    <ul class="q-ml-md">
      <li
        v-for="qualification in tutorData.qualifications"
        :key="qualification"
      >
        {{ qualification }}
      </li>
    </ul>
    <div class="text-caption q-mt-md">Courses qualified to deliver:</div>
    <ul class="q-ml-md">
      <li v-for="course in tutorData.courses_qualified" :key="course">
        {{ course }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { supabase } from "../lib/supabaseClient";
import { useRoute } from "vue-router";

//reactive variable to hold the tutor data
const tutorData = ref({});

//function to get the tutor data from the database
const getTutor = async () => {
  const $route = useRoute();
  const { data } = await supabase
    .from("tutors")
    .select()
    .eq("id", $route.params.id)
    .single();
  // assign the fetched data to the reactive variable
  tutorData.value = data;
};
// call the function to get the tutor data
getTutor();
</script>
