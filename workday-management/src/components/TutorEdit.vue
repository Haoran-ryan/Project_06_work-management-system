<template>
  <div class="column flex-center">
    <h3>Edit Tutor</h3>
    <TutorForm
      v-if="tutorData"
      :tutorData="tutorData"
      v-on:updateTutorData="handleSubmit"
    />
  </div>
</template>

<script>
import TutorForm from "./TutorForm.vue";
import { supabase } from "src/lib/supabaseClient";

export default {
  name: "TutorEdit",
  components: {
    TutorForm,
  },
  data() {
    return {
      tutorData: null,
    };
  },
  async mounted() {
    const { data, error } = await supabase
      .from("tutors")
      .select("*")
      .eq("id", this.$route.params.id);
    this.tutorData = data[0];
  },
  methods: {
    async handleSubmit(newTutorData) {
      console.log("newTutorData: ", newTutorData);
      const { name, email, qualifcations, courses_qualified } = newTutorData;
      // update the data to supabase
      const { error } = await supabase
        .from("tutors")
        .update([
          {
            name: name,
            email: email,
            qualifcations: qualifcations,
            courses_qualified: courses_qualified,
          },
        ])
        .eq("id", this.$route.params.id);
    },
  },
};
</script>
