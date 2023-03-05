<script setup> 
    import { ref, toRefs, defineProps, onMounted } from 'vue';
    import { supabase } from '../lib/supabaseClient'

    const props = defineProps({
        displayCreateForm: Boolean,
    }); 
    const { displayCreateForm } = toRefs(props);
    console.log(` child component - displayCreateForm`, displayCreateForm.value);
    const formData =
        {
        name:'',
        email:'',
        qualifications:'',
        coursesQualified:'',
    }
    
    // Supabase 
    const allTutorsOnSupa = ref([]);
    async function getAllTutors(){
        let { data, error } = await supabase
        .from('tutors')
        .select('*')

        // TODO : testing , removed later 
        console.log('Data:', data);
        console.log('Error:', error);

        if(data){
        allTutorsOnSupa.value = data;
        console.log(`data from supabase`, data );
        console.log('tutorsOnSupa', allTutorsOnSupa.value);
        }
    }
    
    onMounted(() => {
        getAllTutors();
        console.log('Mounted, allTutorsOnSupa:', allTutorsOnSupa.value);
    })
    // TODO: set up in Supabase 
    const tutors= [
        {
            name: 'John Doe',
            email: 'upchh@example.com',
            qualifications: 'Computer Science',
            coursesQualified: 'Computer Science',
        },
        {
            name: 'John Doe 2',
            email: 'upchh2@example.com',
            qualifications: 'Computer Science',
            coursesQualified: 'Computer Science',
        }
    ]

    function _submitForm (){
        console.log('submitting from the form: ', formData);

        // add the new tutor to the tutors array
        tutors.push(formData);

        // clear the form
        formData.name = '';
        formData.email = '';
        formData.qualifications = '';
        formData.coursesQualified = '';
    }
</script>

<template>
    <div>
        <p>User Component - conditional rendering working</p>
        <div v-if="displayCreateForm">
            <h3>Create a tutor</h3>
            <div>
                <form @submit.prevent="_submitForm">
                <label for="name">Name: </label>
                <input type="text" id="name" v-model="formData.name">

                <label for="email">Email: </label>
                <input type="email" id="email" v-model="formData.email">
            
                <label for="qualifications">Qualifications: </label>
                <input type="text" name="qualifications" v-model="formData.qualifications">
                
                <label for="courses-qualified">Courses Qualified to Deliver: </label>
                <input type="text" id="courses-qualified" v-model="formData.coursesQualified">
                <button type="submit">Submit</button>
            </form>
            </div>
        </div>
        <div v-if="!displayCreateForm">
            <h3>All Tutors</h3>
            <table>
                <thead>
                    <tr>
                        <th>Tutor Name</th>
                        <th>Email</th>
                        <th>Qualifications</th>
                        <th colspan="3"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(tutor, index) in allTutorsOnSupa.value" :key="index">
                        <td>{{ tutor.name }}</td>
                        <td>{{  tutor.email }}</td>
                        <td>{{ tutor.qualifications }}</td>
                        <td width="75" class="center aligned">Show</td>
                        <td width="75" class="center aligned">Edit</td>
                        <td width="75" class="center aligned">Delete</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style>

</style>