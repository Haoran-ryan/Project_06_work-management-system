<template>
  <div>
    <form @submit.prevent="handleSubmit" class="column flex-center">
      <q-input v-model="name" label="Name" filled class="q-mb-md" />

      <q-input v-model="email" label="Email" filled class="q-mb-md" />

      <q-input
        v-model="qualifications"
        label="Qualifications"
        filled
        class="q-mb-md"
      />

      <q-input label="Courses Qualified" filled class="q-mb-md" />

      <q-btn label="Submit" type="submit" color="primary" class="q-mt-md" />
    </form>
  </div>
</template>

<script>
import { ref, toRefs } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "TutorForm",
  props: {
    tutorData: {
      type: Object,
    },
  },
  setup(props, { emit }) {
    const router = useRouter();
    const { tutorData } = toRefs(props);
    // console.log("tutordata", tutorData.value);
    const name = ref(tutorData.value.name);
    const email = ref(tutorData.value.email);
    const qualifications = ref(tutorData.value.qualifications);
    const coursesQualified = ref(tutorData.value.courses_qualified);

    const handleSubmit = () => {
      const tutorData = {
        name: name.value,
        email: email.value,
        qualifications: `{${qualifications.value}}`,
        courses_qualified: coursesQualified.value,
      };
      console.log("tutorData in the handlesubmit: ", tutorData);

      emit("updateTutorData", tutorData);
      // construct the URL for the tutor's show page using the 'id' parameter from props
      const tutorId = props.tutorData.id;
      router.push(`/tutors/${tutorId}`);
    };

    return {
      name,
      email,
      qualifications,
      coursesQualified,
      handleSubmit,
    };
  },
};
</script>
