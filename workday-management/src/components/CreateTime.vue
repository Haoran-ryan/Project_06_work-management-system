<script setup>
import { ref, toRefs, defineProps, onMounted, watch } from "vue";
import { supabase } from "../lib/supabaseClient";

const props = defineProps({
  createForm: Boolean,
});
const { createForm } = toRefs(props);


const allTimesOnSupa = ref([]);
async function getAllTimes() {
  let { data, error } = await supabase.from("times").select("*");

  if (data) {
    allTimesOnSupa.value = data;
  }
}
const tutorsOnSupa = ref([]);
async function getAllTutors() {
  let { data, error } = await supabase.from("tutors").select('id, name, courses_qualified');

  if (data) {
    tutorsOnSupa.value = data;
  }
}

const courseDurations = ref([]);
async function getCourseDurations() {
  let { data, error } = await supabase.from("courses").select('name, duration');

  if (data) {
    courseDurations.value = data;
  }
}


onMounted(() => {
  getAllTimes();
  getAllTutors();
  getCourseDurations();
});

watch(createForm, (newValue, oldValue) => {
  getAllTimes();
});

const selectedCourse = ref('')
const filteredTutors = ref([])
function updateTutors() {
  filteredTutors.value = tutorsOnSupa.value.filter(tutor => tutor.courses_qualified.includes(selectedCourse.value))
}
watch(selectedCourse, () => {
  if (selectedCourse.value) {
    updateTutors()
  } else {
    filteredTutors.value = []
  }
})



const todayDate = new Date().toISOString().substr(0, 10);
const eigthAm = '08:00';
</script>
<script>
  export default {
      methods: {
          async createTime(event) {
  const btn = event.target;
  btn.style.display = 'none';
  const tr = btn.parentElement;

  const startDate = tr.querySelector('#start_date').value;
  const time = tr.querySelector('#time').value;
  const course = tr.querySelector('#course').value;
  const tutorId = tr.querySelector('#tutor').value;

  try {
    const { data, error } = await supabase
      .from('times')
      .insert({ start_date: startDate, time, course, tutor_id: tutorId });

    if (error) {
      console.error(error);
      throw new Error('Failed to create time entry');
    }

    console.log('Time entry created:', data);
    this.$emit('time-created');
  } catch (error) {
    console.error(error);
    alert('An error occurred while creating the time entry');
  }
}
      }
  }
</script>


<template>
    <tr v-if="createForm">
      
      <td><input type="date" id='start_date' v-model="todayDate"></td>
      <td><input type="time" id='time' v-model="eigthAm"></td>
      <td>
        <select id='course' v-model="selectedCourse">
          <option disabled value="" selected>Please select course</option>
          <option v-for="course in courseDurations" :key="course.name" :value="course.name">{{ course.name }} ({{ course.duration }} weeks)</option>
        </select>
      </td>
      <td>
        <select id='tutor'>
          <option disabled value="" selected>Please select tutor</option>
          <option v-for="tutor in filteredTutors" :key="tutor.id" :value="tutor.id">{{ tutor.id }} {{ tutor.name }}</option>
        </select>
      </td>
      <v-btn id='create'  @click='createTime($event)' width="50">Create</v-btn>

      
      
      
      
      
      
    </tr>
</template>

<style scoped>
td {
  pointer-events: auto;
}
</style>