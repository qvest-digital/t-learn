import CourseCreationForm from "@/components/CourseCreationForm";
import CourseOverview from "@/components/CourseOverview";

export default [
    {path: '/create', name: 'courseCreation', component: CourseCreationForm},
    {path: '*', component: CourseOverview}
]