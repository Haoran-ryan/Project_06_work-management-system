<template>
  <div class="container">
    <button @click="displayCourses = !displayCourses">
      {{ displayCourses ? "Create Course" : "All Courses" }}
    </button>

    <div class="q-pa-xl" v-if="allCourses && displayCourses">
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

    <form v-else @submit.prevent="_submitForm">
      <h3 class="text-h5">Create A Course</h3>
      <div class="q-pa-md">
        <div class="q-gutter-md" style="max-width: 300px">
          <q-input
            filled
            label="Course Name"
            type="text"
            v-model="newCourse.name"
          />
          <q-input
            filled
            label="Course Description"
            type="text"
            v-model="newCourse.description"
          />
          <q-input
            filled
            label="Course Duration"
            type="number"
            v-model="newCourse.duration"
          />
        </div>
      </div>
      <div class="q-pa-md q-gutter-sm">
        <q-btn
          style="background: #ff0080; color: white"
          label="Create"
          type="submit"
          icon="edit_location"
          no-caps
        />
        <q-btn
          style="background: goldenrod; color: white"
          label="Back"
          icon="directions"
          @click="displayCourses = true"
        />
      </div>
    </form>
  </div>
</template>

<script setup>
import { supabase } from "src/lib/supabaseClient";
import { reactive, onUpdated, onMounted, ref } from "vue";

import CourseForm from "./CourseForm.vue";

const displayCourses = ref(true);

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
onMounted(getAllCourses);
onUpdated(getAllCourses);

// variable to store the new course data
const newCourse = reactive({
  name: "",
  duration: null,
  description: "",
});

function _submitForm() {
  console.log(newCourse);
  // insert newCourse into Supabase
  const insertIntoSupabase = async function () {
    let { data, error } = await supabase.from("courses").insert([
      {
        name: newCourse.name,
        duration: newCourse.duration,
        description: newCourse.description,
      },
    ]);
  };
  displayCourses.value = true;
  insertIntoSupabase();
  // clear the form
  newCourse.name = "";
  newCourse.duration = null;
  newCourse.description = "";
}
</script>

<script></script>
