<template>
    <div class="feedback-counter-container">
        <div class="feedback-counter-container">
            <img src="../assets/images/hand-thumbs-up.svg" />
            <span>
                {{ likes }}
            </span>
        </div>
        <div class="feedback-counter-container dislikes">
            <img src="../assets/images/hand-thumbs-down.svg" />
            <span>
                {{ dislikes }}
            </span>
        </div>
    </div>
</template>

<script>
import { getCourseFeedback } from '@/services/BackendService';
import handleError from '@/components/handleError';

export default {
    props: {
        courseId: {
            type: Number,
            default: 0
        },
        feedbackList: {
            type: Array
        }
    },
    data() {
        return {
            likes: 0,
            dislikes: 0
        };
    },
    watch: {
        feedbackList: function () {
            this.countFeedback(this.feedbackList);
        }
    },
    methods: {
        loadCourseFeedbackCounter() {
            getCourseFeedback(this.courseId)
                .then(({ data }) => {
                    this.countFeedback(data);
                })
                .catch((error) => handleError(this, error));
        },
        countFeedback(feedbackList) {
            this.likes = 0;
            this.dislikes = 0;
            feedbackList.forEach((feedback) => {
                if (feedback.recommendation === true) {
                    this.likes++;
                } else {
                    this.dislikes++;
                }
            });
        }
    },
    mounted() {
        /* 
        pass courseId in the props to call the async method OR
        pass feedbackList in the props to avoid calling the async method
        */
        this.courseId
            ? this.loadCourseFeedbackCounter()
            : this.countFeedback(this.feedbackList);
    }
};
</script>

<style lang="scss" scoped>
.feedback-counter-container {
    display: flex;
    align-items: center;
}
.dislikes {
    margin-left: $space-s;
}
span {
    margin-left: $space-xs;
}
</style>
