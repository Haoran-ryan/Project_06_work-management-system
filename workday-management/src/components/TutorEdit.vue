<template>
  <div>
    <h1>Edit Tutor</h1>
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
      // update the data to supabase
      const { error } = await supabase
        .from("tutors")
        .update(newTutorData)
        .eq("id", this.$route.params.id);
    },
  },
};
</script>
