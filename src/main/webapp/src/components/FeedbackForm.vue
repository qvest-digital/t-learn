<template>
    <div>
        <div class="feedback-tip-text">
            Die Inhalte werden veröffentlicht sein.
        </div>
        <div class="feedback-questions-container">
            <div class="row">
                <div class="column">
                    <label
                        for="feedback-participant-name"
                        class="feedback-label"
                    >
                        Wie lautet Dein Name?
                    </label>
                    <input
                        type="text"
                        v-model="$v.feedback.participantName.$model"
                        @change="$emit('feedback', feedback)"
                        id="feedback-participant-name"
                        placeholder="Kurzantwort-Text (Optional)"
                    />
                    <span
                        v-if="$v.feedback.participantName.$error"
                        class="feedback-validation-text"
                        data-testid="participantNameErrorMessage"
                    >
                        Die maximale Länge sind 255 Zeichen.
                    </span>
                </div>
            </div>
            <div class="row">
                <div class="column">
                    <label for="feedback-dislikes" class="feedback-label">
                        Was hat Dir im Rahmen der Fortbildung nicht gefallen?
                    </label>
                    <input
                        type="text"
                        v-model="$v.feedback.dislikes.$model"
                        @change="$emit('feedback', feedback)"
                        id="feedback-dislikes"
                        placeholder="Langantwort-Text (Optional)"
                    />
                    <span
                        v-if="$v.feedback.dislikes.$error"
                        class="feedback-validation-text"
                        data-testid="dislikesErrorMessage"
                    >
                        Die maximale Länge sind 2000 Zeichen.
                    </span>
                </div>
            </div>
            <div class="row">
                <div class="column">
                    <label for="feedback-likes" class="feedback-label">
                        Was hat Dir besonders gut gefallen?
                    </label>
                    <input
                        type="text"
                        v-model="$v.feedback.likes.$model"
                        @change="$emit('feedback', feedback)"
                        id="feedback-likes"
                        placeholder="Langantwort-Text (Optional)"
                    />
                    <span
                        v-if="$v.feedback.likes.$error"
                        class="feedback-validation-text"
                        data-testid="likesErrorMessage"
                    >
                        Die maximale Länge sind 2000 Zeichen.
                    </span>
                </div>
            </div>
            <div class="row">
                <div class="column">
                    <label
                        :class="
                            validationStateClass('feedback.recommendation') +
                                ' feedback-label required-label'
                        "
                    >
                        Kannst Du die Teilnahme an dieser Fortbildung
                        weiterempfehlen?
                    </label>
                    <RadioButton
                        name="feedback-recommendation"
                        label="Ja"
                        id="feedback-radio-button-yes"
                        :value="feedback.recommendation"
                        @change="setFeedbackRecommendation"
                        :validationClass="
                            validationStateClass('feedback.recommendation')
                        "
                    >
                    </RadioButton>
                    <RadioButton
                        name="feedback-recommendation"
                        label="Nein"
                        id="feedback-radio-button-no"
                        :value="feedback.recommendation"
                        @change="setFeedbackRecommendation"
                        :validationClass="
                            validationStateClass('feedback.recommendation')
                        "
                    >
                    </RadioButton>
                    <span
                        v-if="$v.feedback.recommendation.$error"
                        class="feedback-validation-text"
                    >
                        Bitte wählen.
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { maxLength, required } from 'vuelidate/lib/validators';
import { validationStateClass } from '@/utils/validations';
import RadioButton from './RadioButton';
export default {
    components: {
        RadioButton
    },
    data: function() {
        return {
            feedback: {
                participantName: '',
                dislikes: '',
                likes: '',
                recommendation: null
            }
        };
    },
    methods: {
        touch: function() {
            this.$v.$touch();
            this.$emit('ready', !this.$v.$invalid);
        },
        setFeedbackRecommendation(value) {
            this.feedback.recommendation = value === 'Ja' ? true : false;
        },
        validationStateClass
    },
    validations: {
        feedback: {
            participantName: { maxLength: maxLength(255) },
            dislikes: { maxLength: maxLength(2000) },
            likes: { maxLength: maxLength(2000) },
            recommendation: { required }
        }
    }
};
</script>

<style lang="scss" scoped>
.feedback-tip-text {
    margin-top: $space-s;
    margin-bottom: $space-xl;
}

.feedback-label {
    font-size: $font-m;
    color: $black;
    font-weight: $normal;
    margin-bottom: $space-s;
}
.required-label::after {
    color: $red;
    font-size: $font-xs;
    font-weight: $bold;
    content: '\00a0*';
}
.is-invalid {
    color: $red;
}
.feedback-validation-text {
    color: $red;
    margin-top: $space-xs;
}
.feedback-radio-button-container {
    display: inline-flex;
    align-items: center;
    margin-bottom: $space-s;
}

input {
    background-color: $white;
    padding: 0 $space-xs;
    border-radius: $border-radius-xs;
    border: solid 1px $grey;
    height: 34px;
    font-size: $font-xs;
    &:focus {
        outline-width: 1px;
        outline-color: $dark-grey;
    }
}
input[type='radio'] {
    margin-right: $space-s;
    border: 0px;
    width: 5%;
    height: $font-l;
}
.row {
    margin-bottom: $space-l;
}
</style>
