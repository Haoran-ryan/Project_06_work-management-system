<template>
  <div class="container">
    <button @click="displayAnnouncements = !displayAnnouncements">
      {{ displayAnnouncements ? "Create Announcement" : "All Announcements" }}
    </button>

    <div class="q-pa-xl" v-if="allAnnouncements && displayAnnouncements">
      <h3 class="text-h5">All Announcements</h3>
      <q-list>
        <q-item v-for="announcement in allAnnouncements.value" :key="announcement.id">
          <q-item-section>
            <q-item-label>Title: {{ announcement.title }}</q-item-label>
            <q-item-label caption>Description: {{ announcement.description }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-btn
              icon="edit"
              :to="{ name: 'announcement_edit', params: { id: announcement.id } }"
            />
            <q-btn icon="delete" @click="_deleteAnnouncement(announcement.id)" />
          </q-item-section>
        </q-item>
      </q-list>
    </div>

    <form v-else @submit.prevent="_submitCreateForm">
      <h3 class="text-h5">Create an announcement</h3>
      <div class="q-pa-md">
        <div class="q-gutter-md" style="max-width: 300px">
          <q-input
            filled
            label="Title"
            type="text"
            v-model="newAnnouncement.title"
          />
          <q-input
            filled
            label="Description"
            type="text"
            v-model="newAnnouncement.description"
          />
        </div>
      </div>
      <div class="q-pa-md q-gutter-sm">
        <q-btn
          style="background: #ff0080; color: white"
          label="Create"
          type="submit"
          icon="edit_location"
          no-caps
        />
        <q-btn
          style="background: goldenrod; color: white"
          label="Back"
          icon="directions"
          @click="displayAnnouncements = true"
        />
      </div>
    </form>
  </div>
</template>

<script setup>
import { supabase } from "src/lib/supabaseClient";
import { reactive, onUpdated, onMounted, ref } from "vue";

import AnnouncementForm from "./AnnouncementForm.vue";

const displayAnnouncements = ref(true);

const allAnnouncements = reactive({});

const getAllAnnouncements = async () => {
  const { data, error } = await supabase.from("announcements").select("*");
  // console.log("data from supabase: ", data);
  if (error) {
    console.log(error);
  } else {
    allAnnouncements.value = data;
  }
};

// getAllAnnouncements();
onMounted(getAllAnnouncements);
onUpdated(getAllAnnouncements);

// variable to store the new course data
const newAnnouncement = reactive({
  natitleme: "",
  description: null,
});

function _submitCreateForm() {
  console.log(newAnnouncement);
  // insert newAnnouncement into Supabase
  const insertIntoSupabase = async function () {
    let { data, error } = await supabase.from("announcements").insert([
      {
        title: newAnnouncement.name,
        description: newAnnouncement.description,
      },
    ]);
  };
  displayAnnouncements.value = true;
  insertIntoSupabase();
  // clear the form
  newAnnouncement.title = "";
  newAnnouncement.description = "";
}

async function _deleteAnnouncement(id) {
  const { data, error } = await supabase.from("announcements").delete().eq("id", id);
  getAllAnnouncements();
}
</script>

