<template>
  <div class="q-pa-md" style="max-width: 400px">
    <q-form @submit.prevent="handleSubmit" class="column flex-center">
      <q-input
        filled
        v-model="name"
        label="Course name"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

      <q-input
        filled
        v-model="description"
        label="Course description"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

      <q-input
        filled
        type="number"
        v-model="duration"
        label="Course duration"
        lazy-rules
        :rules="[
          (val) => (val !== null && val !== '') || 'Please type the duration',
          (val) => (val > 0 && val < 10000) || 'Please type a valid duration',
        ]"
      />

      <!-- <q-toggle v-model="accept" label="I accept the license and terms" /> -->

      <div>
        <q-btn label="Submit" type="submit" color="primary" />
      </div>
    </q-form>
  </div>
</template>

<script>
import { ref, toRefs } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "CourseForm",
  props: {
    courseData: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const router = useRouter();
    const { courseData } = toRefs(props);
    // const { name, duration, description } = courseData.value[0];

    const name = ref(courseData.value[0].name);
    const duration = ref(courseData.value[0].duration);
    const description = ref(courseData.value[0].description);

    const handleSubmit = function () {
      const courseData = {
        name: name.value,
        duration: duration.value,
        description: description.value,
      };
      console.log("before being emitted: ", courseData);
      emit("updateCourse", courseData);
      router.push(`/courses`);
    };

    return {
      name,
      duration,
      description,
      handleSubmit,
    };
  },
};
</script>
