<script setup>
import { ref, toRefs, defineProps, onMounted } from "vue";
import { supabase } from "../lib/supabaseClient";

// Supabase
const allTimesOnSupa = ref([]);
async function getAllTimes() {
  let { data, error } = await supabase.from("times").select("*, tutor:tutor_id(name)");

  if (data) {
    allTimesOnSupa.value = data;
  }
}

const tutorNames = ref([]);
async function getTutorNames() {
  let { data, error } = await supabase.from("tutors").select('id, name')

  if (data) {
    // Store the tutor data in an object where the keys are the tutor IDs and the values are the tutor names
    tutorNames.value = data.reduce((acc, tutor) => {
      acc[tutor.id] = tutor.name;
      return acc;
    }, {});
  }
}



onMounted(() => {
  getAllTimes();
  getTutorNames();
});









let timeDetails = {}
let originalTime = {}


const editTime = function(event, time) {
  this.timeDetails = time;
  this.originalTime = {
    original: {
      ...time
    }
  }
  const btn = event.target;
  btn.style.display = 'none'
  const tr = btn.parentElement;
  tr.querySelector('#delete').style.display = 'none'
  tr.querySelector('#confirmEdit').style.display = 'inline-flex'
  tr.querySelector('#cancelEdit').style.display = 'inline-flex'
  for (let child of tr.children) {
    child.style.pointerEvents = 'auto';
  } 
}
const cancelEdit = function(event, time) {
  const btn = event.target;
  btn.style.display = 'none'
  const tr = btn.parentElement;
  tr.querySelector('#confirmEdit').style.display = 'none'
  tr.querySelector('#edit').style.display = 'inline-flex'
  tr.querySelector('#delete').style.display = 'inline-flex'
  for (let child of tr.children) {
    child.style.pointerEvents = 'auto';
  } 
  tr.querySelector('.course').value = originalTime.original.course
}


const deleteTime = async (timeId) => {
  try {
    await supabase.from('times').delete().eq('id', timeId);
    allTimesOnSupa.value = allTimesOnSupa.value.filter((time) => time.id != timeId);
  } catch (error) {
    console.log('error', error);
  }
};

</script>

<template>
    <div>
        <h3>All Times</h3>
        <p>{{allTimesOnSupa.value}}</p>
        <table>
            <thead>
            <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Course</th>
                <th>Tutor</th>
                <th colspan="4"></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="time in allTimesOnSupa" :key="time.id">
                <td><input type="date" v-model="time.date"></td>
                <td><input type="time" v-model="time.time"></td>
                <td><input class="course" type="text" v-model="time.course"></td>
                <td>
                  <select v-model="time.tutor_id">
                    <option disabled value="">Please select one</option>
                    <option v-for="(name, id) in tutorNames" :key="id" :value="id">{{ id }} {{ name }}</option>
                  </select>
                </td>
                <v-btn id='edit' width="50" @click='editTime($event, time)'>Edit</v-btn>
                <v-btn id='delete'  @click='deleteTime(time.id)' width="50">Delete</v-btn>
                <v-btn id='confirmEdit'  width="50">Confirm</v-btn>
                <v-btn id='cancelEdit' @click='cancelEdit($event, time)' width="50">Cancel</v-btn>
                <v-btn id='confirmNew'  width="50">Confirm</v-btn>
                <v-btn id='cancelNew' @click='cancelEdit($event, time)' width="50">Cancel</v-btn>
            </tr>
            </tbody>
        </table>   
    </div>
</template>

<style scoped>

td{
  pointer-events: none;
}

#confirmEdit, #cancelEdit, #confirmNew, #cancelNew {
  display: none;
}

</style>