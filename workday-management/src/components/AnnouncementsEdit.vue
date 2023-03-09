<template>
  <div class="column flex-center">
    <h3>Edit Announcement</h3>
    <AnnouncementForm
      v-if="announcementData"
      :announcementData="announcementData"
      v-on:updateAnnouncement="updateAnnouncement"
    />
  </div>
</template>
<script setup>
import { supabase } from "src/lib/supabaseClient";
import { onBeforeMount, ref, watch, onUpdated, onMounted } from "vue";
import { useRoute } from "vue-router";

import AnnouncementForm from "src/components/AnnouncementForm.vue";

const announcementData = ref({});

const route = useRoute();
// get the data for the announcement of the current param id
const getAnnouncementData = async () => {
  const { data, error } = await supabase
    .from("announcements")
    .select("*")
    .eq("id", route.params.id);

  announcementData.value = data;
  // console.log("Parent component - announcementData.value: ", announcementData.value);
};

// event listener: update the course data
const updateAnnouncement = async (newAnnouncementData) => {
  console.log("newAnnouncementData: ", newAnnouncementData);
  const { error } = await supabase
    .from("announcements")
    .update(newAnnouncementData)
    .eq("id", route.params.id);
};
onBeforeMount(() => getAnnouncementData());
onMounted(getAnnouncementData);
onUpdated(getAnnouncementData)
</script>
