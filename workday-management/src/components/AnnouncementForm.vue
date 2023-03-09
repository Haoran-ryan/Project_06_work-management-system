<template>
  <div class="q-pa-md" style="max-width: 400px">
    <q-form @submit.prevent="handleSubmit" class="column flex-center">
      <q-input
        filled
        v-model="title"
        label="Title"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

      <q-input
        filled
        v-model="description"
        label="Description"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
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
  name: "AnnouncementForm",
  props: {
    announcementData: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const router = useRouter();
    const { announcementData } = toRefs(props);
    // const { title, description } = announcementData.value[0];


    const title = ref(announcementData.value[0].title);
    const description = ref(announcementData.value[0].description);

    const handleSubmit = function () {
      const announcementData = {
        title: title.value,
        description: description.value,
      };
      console.log("before being emitted: ", announcementData);
      emit("updateAnnouncement", announcementData);
      router.push(`/announcements`);
    };

    return {
      title,
      description,
      handleSubmit,
    };
  },
};
</script>