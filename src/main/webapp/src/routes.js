import CourseCreationForm from "@/components/CourseCreationForm";
import CourseOverview from "@/components/CourseOverview";
import CourseDetails from "@/components/CourseDetails";

export default [
  { path: "/create", name: "courseCreation", component: CourseCreationForm },
  {
    path: "/details/:courseId",
    name: "courseDetails",
    component: CourseDetails,
    props: route => ({ courseId: Number.parseInt(route.params.courseId) })
  },
  { path: "*", component: CourseOverview }
];
