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
              event-color="indigo-6"
            />
          </div>
        </template>

        <template v-slot:after>
          <q-tab-panels
            v-model="date"
            animated
            transition-prev="jump-up"
            transition-next="jump-up"
            v-for="time in timesOnSupa" :key="time.id" 
          >
              <q-tab-panel :value="time.id" :name="time.start_date.replaceAll('-', '/')">
                <!-- <div class="text-h4 q-mb-md">{{ time.start_date }}</div> -->
                <p>Tutor: {{ time.tutor.name }}</p>
                <p>Course: {{ time.course.name }}</p>
                <p>Start time: {{ time.time }}</p>
              </q-tab-panel>

            
          </q-tab-panels>
        </template>
      </q-splitter>
    
    </div>
    <Times />
  </div>
</template>


<script>
import { supabase } from "../lib/supabaseClient";
import { ref, toRefs, defineProps, onMounted } from "vue";

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
      events: [ ],
      timesOnSupa: []
    }
    
  },
  methods: {
    async getAllTimes() {
      let { data, error } = await supabase
        .from("times")
        .select("*, tutor:tutor_id(name), course:course(name, duration)");

      if (data) {
        this.timesOnSupa = data.sort(
          (a, b) => new Date(`1970-01-01T${a.time}`) - new Date(`1970-01-01T${b.time}`)
        );
        this.timesOnSupa = data.sort(
          (a, b) => new Date(a.start_date) - new Date(b.start_date)
        );
        this.events = this.timesOnSupa.map(time => time.start_date.replaceAll('-', '/'));
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      return `${year}/${month}/${day}`;
    }
  },
  async mounted() {
    await Promise.all([this.getAllTimes()]);
  },
}
</script>
