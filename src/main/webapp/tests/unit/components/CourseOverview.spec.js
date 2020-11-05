import '@testing-library/jest-dom';
import { fireEvent, render, waitFor } from '@testing-library/vue';
import CourseOverview from '@/components/CourseOverview.vue';
import {
    deleteCourse,
    getCourses,
    getCourseFeedback
} from '@/services/BackendService';
import routes from '@/routes';
import Vue from 'vue';
import { dateFormatFilter } from '@/filter/dateformatFilter';

Vue.filter('formatDate', dateFormatFilter);

jest.mock('@/services/BackendService');

describe('CourseOverview.vue', () => {
    afterEach(() => {
        getCourses.mockReset();
        deleteCourse.mockReset();
        getCourseFeedback.mockReset();
    });

    it('requests and displays course data from server', async () => {
        await waitFor(() => {
            mockGetCoursesAndFeedback();
        });

        const { findAllByText } = setupComponent();

        const titles = await findAllByText(/Title/);
        expect(titles).toHaveLength(2);

        expect(getCourses).toHaveBeenCalled();
    });

    it("deletes course on server side when 'LÖSCHEN' button is clicked", async () => {
        await waitFor(() => {
            mockGetCoursesAndFeedback();
        });
        deleteCourse.mockImplementationOnce(() => Promise.resolve({}));

        const {
            findAllByText,
            findAllByRole,
            findAllByTestId
        } = setupComponent();

        const deleteButtons = await findAllByTestId('deleteCourseIcon');
        expect(deleteButtons).toHaveLength(2);
        await fireEvent.click(deleteButtons[0]);

        const confirmButtons = await findAllByRole('button', {
            name: 'LÖSCHEN'
        });
        await fireEvent.click(confirmButtons[0]);

        expect(deleteCourse).toHaveBeenCalledWith(1);

        const titles = await findAllByText(/Title/);
        expect(titles).toHaveLength(1);
    });

    it("does not delete anything when 'ABBRECHEN' button was clicked when deleting", async () => {
        await waitFor(() => {
            mockGetCoursesAndFeedback();
        });
        const {
            findAllByText,
            findAllByRole,
            findAllByTestId
        } = setupComponent();

        const deleteButtons = await findAllByTestId('deleteCourseIcon');
        expect(deleteButtons).toHaveLength(2);
        await fireEvent.click(deleteButtons[0]);

        const cancelButtons = await findAllByRole('button', {
            name: 'ABBRECHEN'
        });
        await fireEvent.click(cancelButtons[0]);

        expect(deleteCourse).not.toHaveBeenCalled();

        const titles = await findAllByText(/Title/);
        expect(titles).toHaveLength(2);
    });

    function mockGetCoursesAndFeedback() {
        getCourseFeedback.mockImplementationOnce(() =>
            Promise.resolve({
                data: [
                    {
                        participant_name: 'User3',
                        dislikes: 'bad',
                        likes: '',
                        recommendation: true,
                        feedbackTime: '2012-12-12T09:55:00Z'
                    },
                    {
                        participant_name: 'User4',
                        dislikes: '',
                        likes: 'good',
                        recommendation: true,
                        feedbackTime: '2012-12-12T09:56:00Z'
                    }
                ]
            })
        );
        getCourses.mockImplementationOnce(() =>
            Promise.resolve({
                data: [
                    {
                        id: 1,
                        title: 'Title1',
                        targetAudience: 'TestTestTest1'
                    },
                    {
                        id: 2,
                        title: 'Title2',
                        targetAudience: 'TestTestTest2'
                    }
                ]
            })
        );
    }

    function setupComponent() {
        return render(CourseOverview, {
            routes: routes
        });
    }
});
