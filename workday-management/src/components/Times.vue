<script setup>
import { ref, toRefs, defineProps, onMounted, watch } from "vue";
import { supabase } from "../lib/supabaseClient";

// Supabase
const timesOnSupa = ref([]);
async function getAllTimes() {
  let { data, error } = await supabase.from("times").select("*, tutor:tutor_id(name), course:course(name, duration)");

  if (data) {
    timesOnSupa.value = data;
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









let timeDetails = {}
let originalTime
// let originalTime = {start_date: '', time: '', course: '', tutor_id: ''}
const editTime = function(event, time) {
  // Assign the time object to the plain JavaScript object timeDetails
  originalTime = JSON.parse(JSON.stringify(time));
  const btn = event.target;
  btn.style.display = 'none'
  const tr = btn.parentElement;
  tr.querySelector('#delete').style.display = 'none'
  tr.querySelector('#confirmEdit').style.display = 'inline-flex'
  tr.querySelector('#cancelEdit').style.display = 'inline-flex'
  for (let child of tr.children) {
    child.style.pointerEvents = 'auto';
  }
  const inputs = tr.querySelectorAll('input');
  const selects = tr.querySelectorAll('select');
  for (let input of inputs) {
    input.classList.remove('display');
  }
  for (let select of selects) {
    select.classList.remove('display');
  }
}
const cancelEdit = function(event, time) {
  const btn = event.target;
  btn.style.display = 'none'
  const tr = btn.parentElement;
  const inputs = tr.querySelectorAll('input');
  const selects = tr.querySelectorAll('select');
  for (let input of inputs) {
    input.classList.add('display');
  }
  for (let select of selects) {
    select.classList.add('display');
  }
  tr.querySelector('#confirmEdit').style.display = 'none'
  tr.querySelector('#edit').style.display = 'inline-flex'
  tr.querySelector('#delete').style.display = 'inline-flex'
  for (let child of tr.children) {
    child.style.pointerEvents = 'none';
  } 
  tr.querySelector('#edit').style.pointerEvents = 'auto';
  tr.querySelector('#delete').style.pointerEvents = 'auto';
 
  time.start_date = originalTime.start_date
  time.time = originalTime.time
  time.course.name = originalTime.course.name
  time.tutor_id = originalTime.tutor_id

  tr.querySelector('#start_date').value = originalTime.start_date
  tr.querySelector('#time').value = originalTime.time
  tr.querySelector('#course').value = originalTime.course.name
  tr.querySelector('#tutor').value = originalTime.tutor_id
}


const deleteTime = async (timeId) => {
  try {
    await supabase.from('times').delete().eq('id', timeId);
    timesOnSupa.value = timesOnSupa.value.filter((time) => time.id != timeId);
  } catch (error) {
    console.log('error', error);
  }
};

const updateTime = async (event,timeId) => {
  const btn = event.target;
  btn.style.display = 'none'
  const tr = btn.parentElement;
  const inputs = tr.querySelectorAll('input');
  const selects = tr.querySelectorAll('select');
  for (let input of inputs) {
    input.classList.add('display');
  }
  for (let select of selects) {
    select.classList.add('display');
  }
  for (let child of tr.children) {
    child.style.pointerEvents = 'none';
  } 
  tr.querySelector('#cancelEdit').style.display = 'none'
  tr.querySelector('#delete').style.display = 'inline-flex'
  tr.querySelector('#edit').style.display = 'inline-flex'
  btn.style.pointerEvents = 'auto';
  tr.querySelector('#cancelEdit').style.pointerEvents = 'auto';
  tr.querySelector('#delete').style.pointerEvents = 'auto';
  tr.querySelector('#edit').style.pointerEvents = 'auto';

  try {
    await supabase.from('times')
    .update({ start_date: tr.querySelector('#start_date').value,
              time: tr.querySelector('#time').value,
              course: tr.querySelector('#course').value,
              tutor_id: tr.querySelector('#tutor').value
            })
    .eq('id', timeId);
  } catch (error) {
    console.log('error', error);
  }
};

const createForm = ref(false);


</script>

<template>
    <div>
        <div class=allTimes><h4>All Times</h4><v-btn id='moreTime' @click="createForm = true"><q-icon name="more_time" /></v-btn></div>
        <table>
            <thead>
            <tr>
                <th>Commenced Date </th>
                <th>Time</th>
                <th>Course</th>
                <th>Tutor</th>
                <th colspan="4"></th>
            </tr>
            </thead>
            <tbody>
             <CreateTime :createForm="createForm" />
            <tr v-for="time in timesOnSupa" :key="time.id">
                <td><input type="date" v-model="time.start_date" id='start_date' class='display'></td>
                <td><input type="time" v-model="time.time" id='time' class='display'></td>
                <td>
                  <select v-model="time.course.name" id='course' class='display'>
                    <option disabled value="">Please select one</option>
                    <option v-for="course in courseDurations" :key="course.name" :value="course.name">{{ course.name }} ({{ course.duration }} weeks)</option>
                  </select>
                </td>
                <td>
                  <select v-model="time.tutor_id" id='tutor' class='display'>
                    <option disabled value="">Please select one</option>
                    <option v-for="tutor in tutorsOnSupa" :key="tutor.id" :value="tutor.id">{{ tutor.id }} {{ tutor.name }}</option>
                  </select>
                </td>
                <v-btn id='edit' width="50" @click='editTime($event, time)'>Edit</v-btn>
                <v-btn id='delete'  @click='deleteTime(time.id)' width="50">Delete</v-btn>
                <v-btn id='confirmEdit' @click='updateTime($event, time.id)' width="50">Confirm</v-btn>
                <v-btn id='cancelEdit' @click='cancelEdit($event, time)' width="50">Cancel</v-btn>
                <v-btn id='createTime' width="50">Create</v-btn>
                <v-btn id='cancelCreate' @click='cancelCreate()' width="50">Cancel</v-btn>
            </tr>
            </tbody>
        </table>   
    </div>
</template>

<style scoped>
.allTimes {
  align-items: center;
  display: flex;
}
#moreTime {
  display: block;
  font-size: xx-large;
}
th {
  text-align: left;
}
td {
  pointer-events: none;
}

#confirmEdit, #cancelEdit, #createTime, #cancelCreate {
  display: none;
}


input.display {
  border: none;
}
input.display::-webkit-calendar-picker-indicator {
  display: none;
}
input.display::-webkit-calendar-picker-indicator {
  display: none;
}
select.display {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  border: none;
}


</style>