import TutorShow from "src/components/TutorShow.vue";
import TutorEdit from "src/components/TutorEdit.vue";
import CourseIndex from "src/components/CourseIndex.vue";
import Announcements from "src/components/Announcements.vue";
import ManagerDashboard from "src/components/ManagerDashboard.vue";

const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      {
        path: "/auth",
        component: () => import("src/components/Auth.vue"),
        exact: true,
      },
      {
        path: "/signup",
        component: () => import("src/components/SignUp.vue"),
        exact: true,
      },
      {
        path: "/signin",
        component: () => import("src/components/SignIn.vue"),
        exact: true,
      },
      {
        path: "/manager",
        name: "all_tutors",
        component: ManagerDashboard,
        exact: true,
      },
      {
        path: "/timetable",
        component: () => import("src/components/TimetableDashboard.vue"),
        exact: true,
      },
      {
        path: "/tutors/",
        component: () => import("src/components/TutorsManagement.vue"),
        exact: true,
      },
      {
        path: "/tutors/:id",
        name: "show",
        component: TutorShow,
      },
      {
        path: "/tutors/:id/edit",
        name: "edit",
        component: TutorEdit,
      },
      {
        path: "/courses",
        name: "course_index",
        component: CourseIndex,
        exact: true,
      },
      {
        path: "/announcements",
        component: () => import("src/components/Announcements.vue"),
        exact: true,
      },
      {
        path: "/announcements/:id/edit",
        name: "announcement_edit",
        component: () => import("src/components/AnnouncementsEdit.vue"),
      },
      {
        path: "/courses/:id/edit",
        name: "course_edit",
        component: () => import("src/components/CourseEdit.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
