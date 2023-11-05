// router.js or router/index.js
import { createRouter, createWebHistory } from "vue-router";
import MembersList from "../components/MembersList.vue";
import MembersDetail from "../components/MembersDetail.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "MembersList",
      component: MembersList,
    },
    {
      path: "/member/:login",
      name: "MembersDetail",
      component: MembersDetail,
      props: true,
    },
  ],
});

export default router;
