<template>
  <div>
    <Calendar />
    <Times />
  </div>
</template>

<script>
import Calendar from './Calendar.vue';
import Times from './Times.vue';

export default {
  name: 'TimetableDashboard',
  components: {
    Calendar,
    Times
  }
}
</script>