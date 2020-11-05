import '@testing-library/jest-dom';
import { render } from '@testing-library/vue';
import FeedbackDetails from '@/components/FeedbackDetails';
import { dateFormatFilter } from '@/filter/dateformatFilter';

function renderComponent() {
    return render(
        FeedbackDetails,
        {
            props: {
                feedback: {
                    participantName: 'User',
                    dislikes: 'nothing',
                    likes: 'everything',
                    recommendation: true,
                    feedbackTime: '2012-12-12T09:55:00Z'
                }
            }
        },
        (localVue) => {
            localVue.filter('formatDate', dateFormatFilter);
        }
    );
}

describe('FeedbackDetails.vue', () => {
    it('should render feedback component with given props', () => {
        const { getByText } = renderComponent();
        getByText('User');
        getByText('nothing');
        getByText('everything');
        getByText('Gefällt mir');
        getByText('Erstellt am 12.12.2012');
    });
});
