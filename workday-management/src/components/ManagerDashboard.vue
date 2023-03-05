<script setup>
    import User from './User.vue';
    import { ref, watch } from 'vue'; 

    const displayCreateForm = ref(false);
    console.log(`parent component - displayCreateForm: `, displayCreateForm.value);

    watch(displayCreateForm, (newValue, oldValue) => {
    console.log('displayCreateForm updated:', newValue);
  });
   
</script>

<template>
    <div>
        <div>
            <h1>Manager Dashboard coming</h1>
            <div class="tutor-buttons">
                <button @click="displayCreateForm = true">Add Tutor</button>
                <button @click="displayCreateForm = false">List Tutors</button>
            </div>
        </div>
        <User :displayCreateForm="displayCreateForm"/> 
    </div>
</template>


