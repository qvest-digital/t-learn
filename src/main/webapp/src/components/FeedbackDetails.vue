<template>
    <div>
        <div class="row">
            <div class="column">
                <div class="feedback-participant-name-container">
                    <img src="../assets/images/person-circle.svg" />
                    <div class="name-date-container">
                        <div class="participant-name">
                            {{
                                feedback.participantName || 'Anonymer Benutzer'
                            }}
                        </div>
                        <div v-if="feedback.feedbackTime" class="creation-date">
                            Erstellt am
                            {{
                                feedback.feedbackTime | formatDate('dd.MM.yyyy')
                            }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="column">
                <div
                    v-if="feedback.recommendation"
                    class="feedback-recommendation-container"
                >
                    <img
                        class="recommendation-icon"
                        src="../assets/images/feedback-green.svg"
                    />
                    <div class="recommendation-text like">Gefällt mir</div>
                </div>
                <div v-else class="feedback-recommendation-container">
                    <img
                        class="recommendation-icon"
                        src="../assets/images/feedback-red.svg"
                    />
                    <div class="recommendation-text dislike">
                        Gefällt mir nicht
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="column">
                <div
                    v-if="feedback.dislikes"
                    class="feedback-question-container"
                >
                    <div class="feedback-question">
                        Was hat Dir im Rahmen der Fortbildung nicht gefallen?
                    </div>
                    <div class="feedback-answer">
                        {{ feedback.dislikes }}
                    </div>
                </div>
                <div v-if="feedback.likes" class="feedback-question-container">
                    <div class="feedback-question">
                        Was hat Dir besonders gut gefallen?
                    </div>
                    <div class="feedback-answer">
                        {{ feedback.likes }}
                    </div>
                </div>
            </div>
        </div>
        <div v-if="index < feedbackLength - 1" class="line-seperator"></div>
    </div>
</template>

<script>
export default {
    props: {
        feedbackLength: {
            type: Number,
            default: 1
        },
        index: {
            type: Number,
            default: 0
        },
        feedback: {
            participantName: {
                type: String,
                default: ''
            },
            dislikes: {
                type: String,
                default: ''
            },
            likes: {
                type: String,
                default: ''
            },
            recommendation: {
                type: Boolean,
                required: true
            },
            feedbackTime: {
                type: String,
                default: ''
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.row {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
}
.column {
    display: flex;
    flex-direction: column;
    flex: 1;
}
.row:first-of-type {
    margin-bottom: $space-l;
}
.participant-name {
    font-size: $font-m;
    font-weight: $normal;
    line-height: 1.4;
}
.creation-date {
    font-size: $font-s;
    line-height: 1.4;
}
.feedback-participant-name-container {
    display: flex;
    align-items: center;
}
.name-date-container {
    margin-left: $space-s;
}
.feedback-recommendation-container {
    @extend .feedback-participant-name-container;
    justify-content: flex-end;
}
.recommendation-text {
    font-size: $font-m;

    margin-left: $space-xs;
}
.like {
    color: $green;
}
.dislike {
    color: $red;
}
.feedback-question-container {
    margin-bottom: $space-m;
}
.feedback-question {
    font-size: $font-m;
    font-weight: $normal;
    margin-bottom: $space-s;
}
.feedback-answer {
    font-size: $font-s;
    line-height: 1.57;
}
.line-seperator {
    border-bottom: solid 1px $grey;
}
</style>
