import CourseCreationForm from '@/components/CourseCreationForm';
import CourseOverview from '@/components/CourseOverview';
import CourseDetails from '@/components/CourseDetails';
import CourseEditForm from '@/components/CourseEditForm';

export default [
    { path: '/create', name: 'courseCreation', component: CourseCreationForm },
    {
        path: '/details/:courseId',
        name: 'courseDetails',
        component: CourseDetails,
        props: (route) => ({ courseId: Number.parseInt(route.params.courseId) })
    },
    {
        path: '/edit/:courseId',
        name: 'courseEdit',
        component: CourseEditForm,
        props: (route) => ({ courseId: Number.parseInt(route.params.courseId) })
    },
    { path: '*', component: CourseOverview }
];
