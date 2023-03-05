<script setup>
    const formData =
        {
        name:'',
        email:'',
        qualification:'',
        courses:'',
    }
 
    function _submitForm (){
        console.log('submitting from the form: ', formData);
    }
</script>

<template>
    <div>
        <h3>Manager Dashboard</h3>
        <h4>Create a tutor</h4>
        <form @submit.prevent="_submitForm">
            Name:
            <input type="text" name="name" v-model="formData.name">
            Email:
            <input type="email" name="email" v-model="formData.email">
            Qualification:
            <input type="text" name="qualification" v-model="formData.qualification">
            Courses qualified for:
            <input type="text" name="courses" v-model="formData.courses">
            <button type="submit">Submit</button>
        </form>
    </div>
</template>

<style>

</style>