import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/vue';
import CourseOverview from '@/components/CourseOverview.vue';
import { deleteCourse, getCourses } from '@/services/BackendService';
import routes from '@/routes';

jest.mock('@/services/BackendService');

describe('CourseOverview.vue', () => {
    afterEach(() => {
        getCourses.mockReset();
        deleteCourse.mockReset();
    });

    it('requests and displays course data from server', async () => {
        mockGetCourses();

        const { findAllByText } = setupComponent();

        const titles = await findAllByText(/Title/);
        expect(titles).toHaveLength(2);
        const targetAudiences = await findAllByText(/TestTestTest/);
        expect(targetAudiences).toHaveLength(2);

        expect(getCourses).toHaveBeenCalled();
    });

    it("deletes course on server side when 'Löschen' button is clicked", async () => {
        mockGetCourses();
        deleteCourse.mockImplementationOnce(() => Promise.resolve({}));

        const { findAllByText, findAllByRole } = setupComponent();

        const deleteButtons = await findAllByRole('button', {
            name: 'Löschen'
        });
        expect(deleteButtons).toHaveLength(2);
        await fireEvent.click(deleteButtons[0]);

        const confirmButtons = await findAllByRole('button', { name: 'Ja' });
        await fireEvent.click(confirmButtons[0]);

        expect(deleteCourse).toHaveBeenCalledWith(1);

        const titles = await findAllByText(/Title/);
        expect(titles).toHaveLength(1);
    });

    it("does not delete anything when 'Abbrechen' button was clicked when deleting", async () => {
        mockGetCourses();

        const { findAllByText, findAllByRole } = setupComponent();

        const deleteButtons = await findAllByRole('button', {
            name: 'Löschen'
        });
        expect(deleteButtons).toHaveLength(2);
        await fireEvent.click(deleteButtons[0]);

        const cancelButtons = await findAllByRole('button', {
            name: 'Abbrechen'
        });
        await fireEvent.click(cancelButtons[0]);

        expect(deleteCourse).not.toHaveBeenCalled();

        const titles = await findAllByText(/Title/);
        expect(titles).toHaveLength(2);
    });

    function mockGetCourses() {
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
