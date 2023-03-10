<template>
  <div class="container column flex-center">
    <div class="column flex-center">
    <h3>Course Management</h3>

    <button class="bg-blue-8"
      @click="
        () => {
          displayCourses = !displayCourses;
          getAllCourses();
        }
      "
    >
      {{ displayCourses ? "Create Course" : "All Courses" }}
    </button>
    </div>
    
    

    <q-separator inset></q-separator>

    <div class="q-pa-xl" v-if="allCourses && displayCourses">
      <h3 class="text-h5">All Courses</h3>
      <q-list>
        <q-separator></q-separator>
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
            />
            <q-btn icon="delete" @click="_deleteCourse(course.id)" />
          </q-item-section>
        </q-item>
      </q-list>
    </div>
    

    <form v-else @submit.prevent="_submitCreateForm" class="flex flex-center">
      <h5>Create A Course</h5>

      <div class="q-pa-md">
        <div style="max-width: 300px">
          
          <label for="name">Course Name: </label>
          <div>
            <input
              filled
              label="Course Name"
              type="text"
              v-model="newCourse.name"
            />
          </div>
          
          <label for="description">Course Description:</label>
          <div>
            <input
              filled
              label="Course Description"
              type="text"
              v-model="newCourse.description"
            />
          </div>
          
          <label for="duration">Course Duration</label>
          <div>
            <input
              filled
              label="Course Duration"
              type="number"
              v-model="newCourse.duration"
            />
          </div>
          
        </div>
      </div>
      <!-- <div class="q-pa-md q-gutter-sm">
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
      </div> -->

      <div>
        <button type="submit">Create</button>
      </div>
      
    </form>
  </div>
</template>

<script setup>
import { supabase } from "src/lib/supabaseClient";
import { reactive, onUpdated, onMounted, ref, onBeforeMount } from "vue";

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
onBeforeMount(getAllCourses);
onMounted(getAllCourses);
onUpdated(getAllCourses);

// variable to store the new course data
const newCourse = reactive({
  name: "",
  duration: null,
  description: "",
});

function _submitCreateForm() {
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

async function _deleteCourse(id) {
  const { data, error } = await supabase.from("courses").delete().eq("id", id);
  getAllCourses();
}
</script>

<script></script>
