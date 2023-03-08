<script setup>
import { ref, toRefs, defineProps, onMounted, watch } from "vue";
import { supabase } from "../lib/supabaseClient";

const props = defineProps({
  displayCreateForm: Boolean,
});
const { displayCreateForm } = toRefs(props);

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

function _submitForm() {
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
    <div v-if="displayCreateForm">
      <h4>Create a tutor</h4>
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
    <div v-if="!displayCreateForm" class="q-pa-xl">
      <h3 class="text-h5">All Tutors</h3>
      <q-list>
        <q-item v-for="tutor in allTutorsOnSupa" :key="tutor.id">
          <q-item-section>
            <q-item-label>Tutor Name: {{ tutor.name }}</q-item-label>
            <q-item-label caption>Email: {{ tutor.email }}</q-item-label>
            <q-item-label caption
              >Qualifications: {{ tutor.qualifications }}</q-item-label
            >
          </q-item-section>
          <q-item-section side>
            <q-btn
              icon="home"
              :to="{ name: 'show', params: { id: tutor.id } }"
            />
            <q-btn
              icon="edit"
              :to="{ name: 'edit', params: { id: tutor.id } }"
            />
            <q-btn
              icon="delete"
              :to="{ name: 'show', params: { id: tutor.id } }"
            />
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
</template>

<style>
form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 1rem;
}

label {
  margin-right: 0.5rem;
  font-weight: bold;
}

input {
  margin-bottom: 0.5rem;
  padding: 0.25rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  background-color: #4caf50;
  color: white;
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

table {
  border-collapse: collapse;
  width: 100%;
}

th,
td {
  padding: 0.5rem;
  text-align: left;
  border: 1px solid #ccc;
}

th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.center {
  text-align: center;
}

.aligned {
  vertical-align: middle;
}
</style>
