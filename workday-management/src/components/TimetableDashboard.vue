<template>
  <div>
    <Calendar :allTimes="allTimes" />
    <Times />
  </div>
</template>
<script setup>
import { supabase } from "../lib/supabaseClient";
import { ref, toRefs, defineProps, onMounted } from "vue";
const allTimesOnSupa = ref([]);
async function getAllTimes() {
  let { data, error } = await supabase.from("times").select("*, tutor:tutor_id(name)");

  if (data) {
    allTimesOnSupa.value = data;
  }
}

onMounted(() => {
  getAllTimes();
});
</script>


<script>
import Calendar from './Calendar.vue';
import Times from './Times.vue';

export default {
  name: 'TimetableDashboard',
  components: {
    Calendar,
    Times
  },
  data(){
    return{
      allTimes: 'sss'
    }
    
  }
}
</script>