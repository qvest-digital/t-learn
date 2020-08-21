import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/vue';
import axios from 'axios';
import CourseCreationForm from '@/components/CourseCreationForm.vue';

jest.mock('axios');

describe('CourseCreationForm.vue', () => {
    it('sends form data on submit to server', async () => {

        axios.post.mockImplementationOnce(() =>
            Promise.resolve({
                data: {},
            }),
        );

        render(CourseCreationForm);

        const errorMessage = screen.getByTestId('errorMsg');
        expect(errorMessage).not.toBeVisible();
        const titleInput = screen.getByLabelText('Titel / Thema');
        expect(titleInput).toBeInTheDocument();
        await fireEvent.update(titleInput, 'Test');

        await fireEvent.submit(screen.getByText('Anlegen'));

        expect(axios.post).toHaveBeenCalledWith('http://localhost:8080/courses', expect.anything());
        await waitFor(() => [
            expect(errorMessage).not.toBeVisible(),
            expect(titleInput).toHaveValue('') // has been reset
        ]);
    })

    it('displays error message on unsuccessful form data on submit to server', async () => {

        axios.post.mockImplementationOnce(() =>
            Promise.reject({
                data: {},
            }),
        );

        render(CourseCreationForm);

        const errorMessage = screen.getByTestId('errorMsg');
        expect(errorMessage).not.toBeVisible();
        const titleInput = screen.getByLabelText('Titel / Thema');
        expect(titleInput).toBeInTheDocument();
        await fireEvent.update(titleInput, 'Test');

        await fireEvent.submit(screen.getByText('Anlegen'));

        expect(axios.post).toHaveBeenCalledWith('http://localhost:8080/courses', expect.anything());
        await waitFor(() => [
            expect(errorMessage).toBeVisible(),
            expect(titleInput).toHaveValue('Test') // has not been reset because of error
        ]);
    })
})