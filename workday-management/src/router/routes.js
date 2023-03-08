import TutorShow from "src/components/TutorShow.vue";
import TutorEdit from "src/components/TutorEdit.vue";

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
        component: () => import("src/components/ManagerDashboard.vue"),
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
        component: () => import("src/components/CourseIndex.vue"),
        exact: true,
      },
      {
        path: "/announcements",
        component: () => import("src/components/Announcements.vue"),
        exact: true,
      }
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
