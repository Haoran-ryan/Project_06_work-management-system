<template>
  <div class="q-pa-xl" v-if="allCourses">
    <h3 class="text-h5">All Courses</h3>
    <q-list>
      <q-item v-for="course in allCourses.value" :key="course.id">
        <q-item-section>
          <q-item-label>Course Name: {{ course.name }}</q-item-label>
          <q-item-label caption>Duration: {{ course.duration }}</q-item-label>
          <q-item-label caption
            >Description: {{ course.description }}</q-item-label
          >
        </q-item-section>
        <q-item-section side>
          <q-btn
            icon="edit"
            :to="{ name: 'course_edit', params: { id: course.id } }"
            s
          />
          <q-btn icon="delete" @click="deleteCourse(course.id)" />
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script setup>
import { supabase } from "src/lib/supabaseClient";
import { reactive, onBeforeMount } from "vue";

import CourseForm from "./CourseForm.vue";

const allCourses = reactive({});

const getAllCourses = async () => {
  const { data, error } = await supabase.from("courses").select("*");
  // console.log("data from supabase: ", data);
  if (error) {
    console.log(error);
  } else {
    allCourses.value = data;
  }
};

// getAllCourses();
onBeforeMount(getAllCourses);
</script>

<script></script>
