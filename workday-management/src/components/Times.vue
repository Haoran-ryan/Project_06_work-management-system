<script setup>
import { ref, toRefs, defineProps, onMounted } from "vue";
import { supabase } from "../lib/supabaseClient";

// Supabase
const allTimesOnSupa = ref([]);
async function getAllTimes() {
  let { data, error } = await supabase.from("times").select("*");

  if (data) {
    allTimesOnSupa.value = data;
  }
}

onMounted(() => {
  getAllTimes();
});

async function updateRecord(record) {
  let { error } = await supabase
    .from("times")
    .update({
      date: record.date,
      time: record.time,
      course: record.course,
      tutor: record.tutor,
    })
    .eq("id", record.id);

  if (error) {
    console.error(error);
  }
}



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
                <th colspan="2"></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="time in allTimesOnSupa" :key="time.id">
                <td>{{ time.date }}</td>
                <td>{{ time.time }}</td>
                <td>{{ time.course }}</td>
                <td>{{ time.tutor }}</td>
                <td width="50" class="center aligned">Edit</td>
                <td width="50" class="center aligned">Delete</td>
            </tr>
            </tbody>
        </table>        
    </div>
</template>