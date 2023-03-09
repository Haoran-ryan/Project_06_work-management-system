<template>
  <div class="column flex-center">
    <h3>Edit Course</h3>
    <CourseForm
      v-if="courseData"
      :courseData="courseData"
      v-on:updateCourse="updateCourse"
    />
  </div>
</template>
<script setup>
import { supabase } from "src/lib/supabaseClient";
import { onBeforeMount, ref, watch } from "vue";
import { useRoute } from "vue-router";

import CourseForm from "src/components/CourseForm.vue";

const courseData = ref({});

const route = useRoute();
// get the data for the course of the current param id
const getCourseData = async () => {
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .eq("id", route.params.id);

  courseData.value = data;
  // console.log("Parent component - courseData.value: ", courseData.value);
};

// event listener: update the course data
const updateCourse = async (newCourseData) => {
  console.log("newCourseData: ", newCourseData);
  const { error } = await supabase
    .from("courses")
    .update(newCourseData)
    .eq("id", route.params.id);
};
onBeforeMount(() => getCourseData());
</script>
