<template>
  <div>
    <div class="q-pa-md column flex-center items-start q-gutter-md">
      <q-card class="my-card" flat bordered>
        <q-img src="https://cdn.quasar.dev/img/parallax2.jpg" />

        <q-card-section>
          <div class="text-overline text-blue-8">Tutor Profile</div>
          <div class="text-h5 q-mt-sm q-mb-xs">{{ tutorData.name }}</div>
          <div class="q-pa-sm">
            Email:
            {{
              tutorData.email
                ? tutorData.email
                : "Please contact the school for information."
            }}
          </div>
          <div class="q-pa-sm">
            Qualifications:
            {{
              tutorData.qualifcations
                ? tutorData.qualifcations
                : "Qualifications are being updated ..."
            }}
          </div>
          <div class="q-pa-sm">
            Courses Qualified to Deliver:
            {{
              tutorData.courses_qualified
                ? tutorData.courses_qualified
                : "Qualified courses are being updated ... "
            }}
          </div>
        </q-card-section>

        <q-card-actions>
          <q-btn flat color="dark" label="Back" :to="{ name: 'all_tutors' }" />
          <q-btn flat color="primary" label="Detailed" />

          <q-space />

          <q-btn
            color="grey"
            round
            flat
            dense
            :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
            @click="expanded = !expanded"
          />
        </q-card-actions>

        <q-slide-transition>
          <div v-show="expanded">
            <q-separator />
            <q-card-section class="text-subitle2">
              {{ lorem }}
            </q-card-section>
          </div>
        </q-slide-transition>
      </q-card>
    </div>

    <!--
    <div class="text-h4">{{ tutorData.name }}</div>
    <div class="text-subtitle">{{ tutorData.email }}</div>
    <div class="text-caption q-mt-md">Qualifications:</div>
    <ul class="q-ml-md">
      <li
        v-for="qualification in tutorData.qualifications"
        :key="qualification"
      >
        {{ qualification }}
      </li>
    </ul>
    <div class="text-caption q-mt-md">Courses qualified to deliver:</div>
    <ul class="q-ml-md">
      <li v-for="course in tutorData.courses_qualified" :key="course">
        {{ course }}
      </li>
    </ul> -->
  </div>
</template>

<script setup>
import { ref } from "vue";
import { supabase } from "../lib/supabaseClient";
import { useRoute } from "vue-router";

//reactive variable to hold the tutor data
const tutorData = ref({});

// variable for Quasar expandable card
const expanded = ref(false);

const lorem = "Tutor details are arriving ...";

//function to get the tutor data from the database
const getTutor = async () => {
  const $route = useRoute();
  const { data } = await supabase
    .from("tutors")
    .select()
    .eq("id", $route.params.id)
    .single();
  // assign the fetched data to the reactive variable
  tutorData.value = data;
};
// call the function to get the tutor data
getTutor();
</script>
