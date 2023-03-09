<template>
  <div>
    <!-- <div class="q-pa-sm row items-start q-gutter-md">
      <q-card class="my-card q-mx-auto" bordered>
        <q-card-section>
          <div class="text-h6">Tutor Details</div> -->
    <TutorDetails />
    <!-- </q-card-section>

        <q-separator />

        <q-card-actions vertical>
          <q-btn flat>Action 1</q-btn>
          <q-btn flat>Action 2</q-btn>
        </q-card-actions>
      </q-card>
    </div> -->
  </div>
</template>

<script>
import TutorDetails from "../components/TutorDetails.vue";

export default {
  name: "TutorShow",
  components: { TutorDetails },
};
</script>
