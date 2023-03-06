<script setup>
import { ref, toRefs, defineProps, onMounted, watch } from "vue";
import { supabase } from "../lib/supabaseClient";

const props = defineProps({
  displayCreateForm: Boolean,
});
const { displayCreateForm } = toRefs(props);
console.log(` child component - displayCreateForm`, displayCreateForm.value);
const newTutor = {
  name: "",
  email: "",
  qualifications: "",
  coursesQualified: "",
};

// Supabase
const allTutorsOnSupa = ref([]);
async function getAllTutors() {
  let { data, error } = await supabase.from("tutors").select("*");

  if (data) {
    allTutorsOnSupa.value = data;
  }
}

watch(displayCreateForm, (newValue, oldValue) => {
  getAllTutors();
});
onMounted(() => {
  getAllTutors();
});
// TODO: set up in Supabase
// const tutors= [
//     {
//         name: 'John Doe',
//         email: 'upchh@example.com',
//         qualifications: 'Computer Science',
//         coursesQualified: 'Computer Science',
//     },
//     {
//         name: 'John Doe 2',
//         email: 'upchh2@example.com',
//         qualifications: 'Computer Science',
//         coursesQualified: 'Computer Science',
//     }
// ]

function _submitForm() {
  console.log("submitting from the form: ", newTutor);

  // inseret newTutor into Supabase
  const insertIntoSupabase = async () => {
    let { data, error } = await supabase.from("tutors").insert([
      {
        name: newTutor.name,
        email: newTutor.email,
        qualifications: newTutor.qualifications,
        courses_qualified: newTutor.coursesQualified,
      },
    ]);
    console.log("data: ", data);
    console.log("error: ", error);
  };
  insertIntoSupabase();
  // clear the form
  newTutor.name = "";
  newTutor.email = "";
  newTutor.qualifications = "";
  newTutor.coursesQualified = "";
}
</script>

<template>
  <div>
    <p>User Component - conditional rendering working</p>
    <div v-if="displayCreateForm">
      <h3>Create a tutor</h3>
      <div>
        <form @submit.prevent="_submitForm">
          <label for="name">Name: </label>
          <input type="text" id="name" v-model="newTutor.name" />

          <label for="email">Email: </label>
          <input type="email" id="email" v-model="newTutor.email" />

          <label for="qualifications">Qualifications: </label>
          <input
            type="text"
            name="qualifications"
            v-model="newTutor.qualifications"
          />

          <label for="courses-qualified">Courses Qualified to Deliver: </label>
          <input
            type="text"
            id="courses-qualified"
            v-model="newTutor.coursesQualified"
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
    <div v-if="!displayCreateForm">
      <h3>All Tutors</h3>
      <table>
        <thead>
          <tr>
            <th>Tutor Name</th>
            <th>Email</th>
            <th>Qualifications</th>
            <th colspan="3"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="tutor in allTutorsOnSupa" :key="tutor.id">
            <td>{{ tutor.name }}</td>
            <td>{{ tutor.email }}</td>
            <td>{{ tutor.qualifications }}</td>
            <td width="75" class="center aligned">Show</td>
            <td width="75" class="center aligned">Edit</td>
            <td width="75" class="center aligned">Delete</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style></style>
