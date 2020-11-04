import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/vue';
import FeedbackCounter from '@/components/FeedbackCounter';
import { getCourseFeedback } from '@/services/BackendService';

jest.mock('@/services/BackendService');

function renderComponentWithFeedBackList() {
    return render(FeedbackCounter, {
        props: {
            feedbackList: [
                {
                    participant_name: 'User',
                    dislikes: 'bad',
                    likes: '',
                    recommendation: true,
                    feedbackTime: '2012-12-12T09:55:00Z'
                },
                {
                    participant_name: 'User0',
                    dislikes: 'bad',
                    likes: '',
                    recommendation: true,
                    feedbackTime: '2012-12-12T09:55:00Z'
                },
                {
                    participant_name: 'User1',
                    dislikes: '',
                    likes: 'good',
                    recommendation: true,
                    feedbackTime: '2012-12-12T09:56:00Z'
                },
                {
                    participant_name: 'User2',
                    dislikes: '',
                    likes: 'good',
                    recommendation: false,
                    feedbackTime: '2012-12-12T09:56:00Z'
                }
            ],
            courseId: 0
        }
    });
}
function renderComponentWithCourseId() {
    return render(FeedbackCounter, {
        props: {
            courseId: 1
        }
    });
}

describe('FeedbackDetails.vue', () => {
    it('should render feedback counter component with given feedbacklist in props', async () => {
        const { getByText } = renderComponentWithFeedBackList();

        await waitFor(() => {
            getByText('3');
            getByText('1');
        });
    });

    it('should render feedback counter component with given courseId in props', async () => {
        getCourseFeedback.mockImplementationOnce(() =>
            Promise.resolve({
                data: [
                    {
                        participant_name: 'User0',
                        dislikes: 'bad',
                        likes: '',
                        recommendation: true,
                        feedbackTime: '2012-12-12T09:55:00Z'
                    },
                    {
                        participant_name: 'User1',
                        dislikes: '',
                        likes: 'good',
                        recommendation: true,
                        feedbackTime: '2012-12-12T09:56:00Z'
                    },
                    {
                        participant_name: 'User2',
                        dislikes: '',
                        likes: 'good',
                        recommendation: false,
                        feedbackTime: '2012-12-12T09:56:00Z'
                    }
                ]
            })
        );
        const { getByText } = renderComponentWithCourseId();

        await waitFor(() => {
            getByText('2');
            getByText('1');
        });
    });
});
