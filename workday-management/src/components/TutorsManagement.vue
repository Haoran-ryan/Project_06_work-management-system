<script setup>
import { ref, toRefs, defineProps, onMounted, watch, onUpdated } from "vue";
import { supabase } from "../lib/supabaseClient";

const props = defineProps({
  displayCreateForm: Boolean,
});
let { displayCreateForm } = toRefs(props);

const newTutor = {
  name: "",
  email: "",
  qualification: "",
  coursesQualified: "",
};

const displayCurrentTutors = ref(false);

// Supabase
const allTutorsOnSupa = ref([]);
async function getAllTutors() {
  let { data, error } = await supabase.from("tutors").select("*");

  if (data) {
    allTutorsOnSupa.value = data;
  }
}

const allCurrentTotors = ref([]);
async function getCurrentTutors() {
  let { data, error } = await supabase
    .from("tutors")
    .select()
    .eq("active", true);
  if (data) {
    allCurrentTotors.value = data;
    // console.log(allCurrentTotors.value);
  }
}

watch(displayCreateForm, (newValue, oldValue) => {
  getAllTutors();
});

onMounted(getAllTutors);
onUpdated(getAllTutors);
onMounted(getCurrentTutors);
onUpdated(getCurrentTutors);

function _submitForm() {
  // inseret newTutor into Supabase
  const insertIntoSupabase = async () => {
    let { data, error } = await supabase.from("tutors").insert([
      {
        name: newTutor.name,
        email: newTutor.email,
        qualification: newTutor.qualification,
        courses_qualified: `{${newTutor.coursesQualified}}`,
      },
    ]);
  };
  insertIntoSupabase();

  // clear the form
  newTutor.name = "";
  newTutor.email = "";
  newTutor.qualification = "";
  newTutor.coursesQualified = "";

  emit();
}

async function _handleActiveStatus(tutorID, currentStatus) {
  const { data, error } = await supabase
    .from("tutors")
    .update({ active: !currentStatus })
    .eq("id", tutorID);
  getAllTutors();
}
</script>

<template>
  <div>
  <div v-if="displayCreateForm">
    <div class="column flex-center">
      <h5>Create a tutor</h5>
      <form @submit.prevent="_submitForm" class="flex-center">
        <div class="column q-pa-md">
          <label for="name">Name: </label>
          <input type="text" id="name" v-model="newTutor.name" />

          <label for="email">Email: </label>
          <input type="email" id="email" v-model="newTutor.email" />

          <label for="qualifications">Qualifications: </label>
          <input
            type="text"
            name="qualifications"
            v-model="newTutor.qualification"
          />

          <label for="courses-qualified">Courses Qualified to Deliver: </label>
          <input
            type="text"
            id="courses-qualified"
            v-model="newTutor.coursesQualified"
          />
        </div>
        <button class="bg-blue-8" type="submit">Create</button>
      </form>
    </div>
  </div>
  <div v-if="!displayCreateForm" class="q-pa-xl">
    <q-separator></q-separator>
    <div v-if="displayCreateForm == false" class="q-pa-xl">
      <h3 class="text-h5">
        {{ displayCurrentTutors ? "Current Tutors" : "All Tutors" }}
      </h3>
      <q-btn
        push
        color="primary"
        label="Current Tutors"
        @click="displayCurrentTutors = !displayCurrentTutors"
      />
      <q-list v-if="displayCurrentTutors == false">
        <q-item v-for="tutor in allTutorsOnSupa" :key="tutor.id">
          <q-item-section>
            <q-item-label>Tutor Name: {{ tutor.name }}</q-item-label>
            <q-item-label>Email: {{ tutor.email }}</q-item-label>
            <q-item-label
              >Qualifications: {{ tutor.qualification }}</q-item-label
            >
            <q-item-label caption
              >Status:
              {{ tutor.active ? "Current" : "Not Current" }}</q-item-label
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
              @click="_handleActiveStatus(tutor.id, tutor.active)"
            />
          </q-item-section>
        </q-item>
      </q-list>
      <!-- to display all current tutors -->
      <div
        class="all-current-tutors"
        v-if="displayCreateForm == false && displayCurrentTutors == true"
      >
        <div class="q-pa-md flex justify-center">
          <div style="max-width: 90%; width: 300px">
            <q-intersection
              v-for="currentTutor in allCurrentTotors"
              :key="currentTutor.id"
              transition="flip-right"
              class="example-item"
            >
              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-avatar color="primary" text-color="white"> Q </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label>Name: {{ currentTutor.name }}</q-item-label>
                  <q-item-label caption lines="1"
                    >Email: {{ currentTutor.email }}</q-item-label
                  >
                </q-item-section>

                <q-item-section side>
                  <q-icon name="chat_bubble" color="green" />
                </q-item-section>
              </q-item>
            </q-intersection>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<style>
h5 {
  margin-bottom: 10px;
}

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
