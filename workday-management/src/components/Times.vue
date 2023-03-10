<script>
import { ref } from "vue";
import { supabase } from "../lib/supabaseClient";
import CreateTime from "./CreateTime.vue";

export default {
  components: {
    CreateTime,
  },
  data() {
    return {
      timesOnSupa: [],
      tutorsOnSupa: [],
      courseDurations: [],
      tutorOption: tutor => `${tutor.name} (ID: ${tutor.id})`,
      timeDetails: {},
      originalTime: '',
      editMode: false,
      createForm: ref(false),
      filteredTutors: []
    }
  },
  watch: {
    timeDetails: {
      handler(newValue, oldValue) {
        if (newValue) {
          this.updateTutors()
        } else {
          filteredTutors.value = []
        }
      },
      deep: true
    }
  },
  // computed: {
  //   filteredTutorsForTime() {
  //     return this.filteredTutors.filter(tutor => tutor.id !== this.time.tutor_id);
  //   }
  // },
  methods: {
    async getAllTimes() {
      let { data, error } = await supabase
        .from("times")
        .select("*, tutor:tutor_id(name), course:course(name, duration)");

      if (data) {
        this.timesOnSupa = data.sort(
          (a, b) => new Date(`1970-01-01T${a.time}`) - new Date(`1970-01-01T${b.time}`)
        );
        this.timesOnSupa = data.sort(
          (a, b) => new Date(a.start_date) - new Date(b.start_date)
        );
        this.$emit('time-updated');
      }
    },
    async getAllTimesAfterCreate() {
      this.$data.createForm = !this.$data.createForm;
      let { data, error } = await supabase
        .from("times")
        .select("*, tutor:tutor_id(name), course:course(name, duration)");
      
      if (data) {
        this.timesOnSupa = data.sort(
          (a, b) => new Date(`1970-01-01T${a.time}`) - new Date(`1970-01-01T${b.time}`)
        );
        this.timesOnSupa = data.sort(
          (a, b) => new Date(a.start_date) - new Date(b.start_date)
        );
        this.$emit('time-updated');
      }
    },
    async getAllTutors() {
      let { data, error } = await supabase.from("tutors").select("id, name, courses_qualified");

      if (data) {
        this.tutorsOnSupa = data.sort(
          (a, b) => a.id - b.id
        );
      }
      this.filteredTutors = this.tutorsOnSupa
    },
    async getCourseDurations() {
      let { data, error } = await supabase.from("courses").select("name, duration");

      if (data) {
        this.courseDurations = data;
      }
    },
    getQualifiedCourses(coursesqualified) {
      const courses = coursesqualified;
      if (courses.length === 1) {
        return courses[0];
      } else if (courses.length === 2) {
        return courses.join(' and ');
      } else {
        const lastCourse = courses[courses.length - 1];
        return `${courses.slice(0, -1).join(', ')} and ${lastCourse}`;
      }
    },
    editTime(event, time) {
      if (this.editMode === true) {
        return alert ("Please exit the edit mode for the other row first.")
      }
      this.editMode = true
      this.$data.createForm = false
      // Change the tutor text to a different format
      this.tutorOption = tutor => `${tutor.name} (ID: ${tutor.id}) qualified for ${this.getQualifiedCourses(tutor.courses_qualified)}`;
      this.timeDetails = time
      // Assign the time object to the plain JavaScript object timeDetails
      this.originalTime = JSON.parse(JSON.stringify(time));
      const btn = event.target;
      btn.style.display = 'none'
      const tr = btn.parentElement;
      tr.querySelector('#delete').style.display = 'none'
      tr.querySelector('#confirmEdit').style.display = 'inline-flex'
      tr.querySelector('#cancelEdit').style.display = 'inline-flex'
      for (let child of tr.children) {
        child.style.pointerEvents = 'auto';
      }
      const inputs = tr.querySelectorAll('input');
      const selects = tr.querySelectorAll('select');
      for (let input of inputs) {
        input.classList.remove('display');
      }
      for (let select of selects) {
        select.classList.remove('display');
      }
      const tutorSelect = tr.querySelector("#tutor")
      setTimeout(() => {
        for (let option of tutorSelect.children) {
            if (!option.textContent.includes(this.originalTime.course.name)) {
              option.disabled = true
            }
        }
      }, 100);
      
      
    },
    cancelEdit(event, time) {
      const btn = event.target;
      btn.style.display = 'none'
      const tr = btn.parentElement;
      const inputs = tr.querySelectorAll('input');
      const selects = tr.querySelectorAll('select');
      for (let input of inputs) {
        input.classList.add('display');
      }
      for (let select of selects) {
        select.classList.add('display');
      }
      tr.querySelector('#confirmEdit').style.display = 'none'
      tr.querySelector('#edit').style.display = 'inline-flex'
      tr.querySelector('#delete').style.display = 'inline-flex'
      for (let child of tr.children) {
        child.style.pointerEvents = 'none';
      } 
      tr.querySelector('#edit').style.pointerEvents = 'auto';
      tr.querySelector('#delete').style.pointerEvents = 'auto';
    
      time.start_date = this.originalTime.start_date
      time.time = this.originalTime.time
      time.course.name = this.originalTime.course.name
      time.tutor_id = this.originalTime.tutor_id

      tr.querySelector('#start_date').value = this.originalTime.start_date
      tr.querySelector('#time').value = this.originalTime.time
      tr.querySelector('#course').value = this.originalTime.course.name
      tr.querySelector('#tutor').value = this.originalTime.tutor_id

      this.tutorOption = tutor => `${tutor.name} (ID: ${tutor.id})`;
      this.editMode = false
      const tutorSelect = tr.querySelector("#tutor")
      setTimeout(() => {
        for (let option of tutorSelect.children) {
          option.disabled = false;
        }
      }, 100);
    },
    async updateTime(event, timeId) {
      const btn = event.target;
      const tr = btn.parentElement;
      let qualifiedTutorIds = []
      for (let tutor of this.tutorsOnSupa) {
        if (tutor.courses_qualified.includes(this.timeDetails.course.name)) {
          qualifiedTutorIds.push(tutor.id)
        }
      }
      if (!qualifiedTutorIds.includes(parseInt(tr.querySelector('#tutor').value))) {
        let tutorName = ''
        for (let tutor of this.tutorsOnSupa) {
          if (tutor.id == this.timeDetails.tutor_id) {
            tutorName = tutor.name
          }
        }
        return alert(`${tutorName} is not qualified to teach ${this.timeDetails.course.name}!`)
      }
      btn.style.display = 'none'
      const inputs = tr.querySelectorAll('input');
      const selects = tr.querySelectorAll('select');
      for (let input of inputs) {
        input.classList.add('display');
      }
      for (let select of selects) {
        select.classList.add('display');
      }
      for (let child of tr.children) {
        child.style.pointerEvents = 'none';
      } 
      tr.querySelector('#cancelEdit').style.display = 'none'
      tr.querySelector('#delete').style.display = 'inline-flex'
      tr.querySelector('#edit').style.display = 'inline-flex'
      btn.style.pointerEvents = 'auto';
      tr.querySelector('#cancelEdit').style.pointerEvents = 'auto';
      tr.querySelector('#delete').style.pointerEvents = 'auto';
      tr.querySelector('#edit').style.pointerEvents = 'auto';
      
      this.editMode = false

      try {
        await supabase.from('times')
        .update({ start_date: tr.querySelector('#start_date').value,
                  time: tr.querySelector('#time').value,
                  course: tr.querySelector('#course').value,
                  tutor_id: tr.querySelector('#tutor').value
                })
        .eq('id', timeId);
      } catch (error) {
        console.log('error', error);
      }
    },
    async deleteTime(timeId) {
      if (this.editMode === true) {
        return alert ("Please exit the edit mode for the other row first.")
      }
      this.$data.createForm = false;
      const confirmed = window.confirm('Are you sure you want to delete this time record?');
      if (!confirmed) {
        return
      }
      try {
        await supabase.from('times').delete().eq('id', timeId);
        this.timesOnSupa = this.timesOnSupa.filter((time) => time.id != timeId);
      } catch (error) {
        console.log('error', error);
      }
    },
    updateTutors() {
      this.filteredTutors = this.tutorsOnSupa.filter(tutor => tutor.courses_qualified.includes(this.timeDetails.course.name))

      const tutorSelects = document.querySelectorAll("#tutor")
      let editedSelect
      if (tutorSelects) {
        for (let select of tutorSelects) {
          if (!select.classList.contains('display')) {
            editedSelect = select
          }
        }
      }
      for (let option of editedSelect.children) {
        option.disabled = false
        if (option.textContent.length === 0) {
          option.remove()
        }
        setTimeout(() => {
          if (!option.textContent.includes(this.timeDetails.course.name)) {
          option.disabled = true
        }
        }, 100);
      }
    },
    filter(event) {
      event.preventDefault()
      const btn = event.target;
      const form = btn.parentElement;
      const select = form.querySelector('select');
      const tbody = document.querySelector('tbody')
      const trs = tbody.querySelectorAll('tr')
      if (select.value.length > 0) {
        for (let tr of trs) {
          tr.style.display = 'revert'
          const course = tr.querySelector('#course')
          if (course.value != select.value) {
            tr.style.display = 'none'
          }
        }
        tbody.scrollIntoView({ block: "end" });
      }
    },
    showAll(event) {
      event.preventDefault()
      const btn = event.target;
      const form = btn.parentElement;
      const select = form.querySelector('select');
      select.value = ''
      const tbody = document.querySelector('tbody')
      const trs = tbody.querySelectorAll('tr')
      for (let tr of trs) {
            tr.style.display = 'revert'
      }
      tbody.scrollIntoView({ block: "end" });

       
    }
  },
  async mounted() {
    await Promise.all([this.getAllTimes(), this.getAllTutors(), this.getCourseDurations()]);
  },
}

</script>
<template>
    <div class="timetable">
        <div class="allTimes"><h4>Timetable</h4><v-btn id='moreTime' @click="createForm = !createForm"><q-icon name="more_time" /></v-btn></div>
        <div>
          
          <form class="filter" action="">
            <p>Fliter by course: </p>
            <select>
              <option value="">Please select course</option>
              <option v-for="course in courseDurations" :key="course.name" :value="course.name">{{ course.name }}</option>
            </select>
            <button class="bg-blue-8 q-mx-md" @click="filter($event)">Filter</button><button class="bg-blue-8" @click="showAll($event)">Show all</button>
          </form>
        </div>
        <table class="q-mt-md">
            <thead>
            <tr>
                <th>Commenced Date </th>
                <th>Time</th>
                <th>Course</th>
                <th>Tutor</th>
                <th class='lastColumn' colspan="4"></th>
            </tr>
            </thead>
            <tbody>
             <CreateTime :createForm="createForm" @time-created="getAllTimesAfterCreate" />
            <tr v-for="time in timesOnSupa" :key="time.id">
                <td class='date'><input type="date" v-model="time.start_date" id='start_date' class='display'></td>
                <td class='time'><input type="time" v-model="time.time" id='time' class='display'></td>
                <td class='course'>
                  <select v-model="time.course.name" id='course' class='display'>
                    <option disabled value="">Please select course</option>
                    <option v-for="course in courseDurations" :key="course.name" :value="course.name">{{ course.name }} ({{ course.duration }} weeks)</option>
                  </select>
                </td>
                <td class='tutor'>
                  <select v-model="time.tutor_id" id='tutor' class='display'>
                    <option disabled value="">Please select tutor</option>
                    <option v-for="tutor in tutorsOnSupa" :key="tutor.id" :value="tutor.id">{{ tutorOption(tutor) }}</option>
                    <!-- <option :key="time.tutor_id" :value="time.tutor_id">{{time.tutor.name}} (ID: {{ time.tutor_id }})</option>
                    <option v-for="tutor in filteredTutors" :key="tutor.id" :value="tutor.id">
                      <span v-if="tutor.id !== time.tutor_id">
                        {{tutor.name}} (ID: {{ tutor.id }})
                      </span>
                    </option> -->
                  </select>
                </td>
                
                <q-icon id='edit' @click='editTime($event, time)' name="edit" />
                <q-icon id='delete' @click='deleteTime(time.id)' name="delete" />
                <q-icon id='confirmEdit' @click='updateTime($event, time.id)' name="thumb_up_alt" />
                <q-icon id='cancelEdit' @click='cancelEdit($event, time)' name="cancel" />
                
            </tr>
            </tbody>
        </table>   
    </div>
</template>

<style>
.timetable {
  display: flex;
  flex-direction: column;
}
.filter {
  display: inline;
}
.allTimes {
  align-items: center;
  display: flex;
}
#moreTime {
  display: block;
  font-size: xx-large;
}
th {
  text-align: left;
}
th.lastColumn {
  border: none;
  background-color: transparent;
}
tr {
  vertical-align: 50%;
}
td {
  pointer-events: none;
}

#confirmEdit, #cancelEdit {
  display: none;
}

v-btn {
  cursor: pointer;
}

#edit, #delete, #confirmEdit, #cancelEdit, #createTime, #cancelCreate {
  font-size: large;
  cursor: pointer;
}

input, select {
  cursor: pointer;
}
td.time {
  width: 130px;
}
td.time > input {
  width: 100%;
}
td.date {
  width: 150px;
}
td.course {
  width: 300px;
}
td.tutor {
  width: 650px;
}

input.display {
  border: none;
}
input.display::-webkit-calendar-picker-indicator {
  display: none;
}
input.display::-webkit-calendar-picker-indicator {
  display: none;
}
select.display {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  border: none;
}


</style>