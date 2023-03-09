<template>
  <div>
     <div>
      <q-splitter
        v-model="splitterModel"
        style="height: 450px"
      >

        <template v-slot:before>
          <div class="q-pa-md">
            <q-date
              v-model="date"
              today-btn
              :events="events"
              event-color="orange"
            />
          </div>
        </template>

        <template v-slot:after>
          <q-tab-panels
            v-model="date"
            animated
            transition-prev="jump-up"
            transition-next="jump-up"
          >
            <!-- <q-tab-panel name="2023/03/01">
              <div class="text-h4 q-mb-md">2023/03/01</div>
              <p>Tutor: </p><p>Course: </p><p>Time: </p>
            </q-tab-panel> -->
              <q-tab-panel v-for="time in timesOnSupa" :key="time.id" :value="time.id" :name="time.start_date">
                <div class="text-h4 q-mb-md">{{ time.start_date }}</div>
                <p>Tutor: {{ time.tutor.name }}</p>
                <p>Course: {{ time.course }}</p>
                <p>Time: {{ time.time }}</p>
              </q-tab-panel>

            
          </q-tab-panels>
        </template>
      </q-splitter>
    
    </div>
    <Times />
  </div>
</template>
<script setup>
import { supabase } from "../lib/supabaseClient";
import { ref, toRefs, defineProps, onMounted } from "vue";
const timesOnSupa = ref([]);
async function getAllTimes() {
  let { data, error } = await supabase.from("times").select("*, tutor:tutor_id(name)");

  if (data) {
    timesOnSupa.value = data;
  }
}

onMounted(() => {
  getAllTimes();
});
</script>


<script>
import Times from './Times.vue';

const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0');
const day = String(today.getDate()).padStart(2, '0');
const todayDate = `${year}/${month}/${day}`;

export default {
  name: 'TimetableDashboard',
  components: {
    
    Times
  },
  data(){
    return{
      splitterModel: ref(50),
      date: ref(todayDate),
      events: [ '2023/03/01', '2023/03/05', '2023/03/06' ]
    }
    
  }
}
</script>
