<template>
  <div>
  <div class="container column flex-center">
    <h3>Announcements</h3>

    <button class="bg-blue-8"
      @click="
        () => {
          displayAnnouncements = !displayAnnouncements;
          getAllAnnouncements();
        }
      "
    >
      {{ displayAnnouncements ? "Create Announcement" : "All Announcements" }}
    </button>
</div>


    <div class="q-pa-xl" v-if="allAnnouncements && displayAnnouncements">
      <h3 class="text-h5">All Announcements</h3>
      <q-list>
        <q-separator></q-separator>
        <q-item v-for="announcement in allAnnouncements.value" :key="announcement.id">
          <q-item-section>
            <q-item-label>Title: {{ announcement.title }}</q-item-label>
            <q-item-label caption
              >Description: {{ announcement.description }}</q-item-label
            >
          </q-item-section>
          <q-item-section side>
            <q-btn
              icon="edit"
              :to="{
                name: 'announcement_edit',
                params: { id: announcement.id },
              }"
            />
            <q-btn
              icon="delete"
              @click="_deleteAnnouncement(announcement.id)"
            />
          </q-item-section>
        </q-item>
      </q-list>
    </div>


    <form v-else @submit.prevent="_submitCreateForm" class="column flex-center">
      <h5>Create an announcement</h5>
      <div class="q-pa-md">
        <div style="max-width: 300px">
            <label for="title">Title</label>
            <div>
            <input
                filled
                label="Title"
                type="text"
                v-model="newAnnouncement.title"
            />
            </div>

            <label for="description">Description</label>
            <div>
            <input
            filled
            label="Description"
            type="text"
            v-model="newAnnouncement.description"
            />
            </div>

        </div>
      </div>

      <div>
        <button type="submit">Create</button>
      </div>

    </form>
  </div>
</template>

<script setup>
import { supabase } from "src/lib/supabaseClient";
import { reactive, onUpdated, onMounted, onBeforeMount, ref } from "vue";

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
    console.log("allAnnouncements Value ? : ", allAnnouncements.value);
  }
};

// getAllAnnouncements();
onBeforeMount(getAllAnnouncements);
onMounted(getAllAnnouncements);
onUpdated(getAllAnnouncements);

// variable to store the new course data
const newAnnouncement = reactive({
  title: "",
  description: null,
});

function _submitCreateForm() {
  console.log(newAnnouncement);
  // insert newAnnouncement into Supabase
  const insertIntoSupabase = async function () {
    let { data, error } = await supabase.from("announcements").insert([
      {
        title: newAnnouncement.title,
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
  const { data, error } = await supabase
    .from("announcements")
    .delete()
    .eq("id", id);
  getAllAnnouncements();
}
</script>
