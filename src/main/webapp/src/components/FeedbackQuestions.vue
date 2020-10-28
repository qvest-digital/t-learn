<template>
    <div>
        <div data-testid="confirmModalContent" class="feedback-tip-text">
            Die Inhalte werden veröffentlicht sein.
        </div>
        <div class="feedback-questions-container">
            <div class="feedback-question">
                <div class="row">
                    <div class="column">
                        <label for="feedback-person-name" class="feedback-label"
                            >Wie lautet Dein Name?</label
                        >
                        <input
                            type="text"
                            v-model="$v.feedback.personName.$model"
                            @change="$emit('feedback', feedback)"
                            id="person-name"
                            placeholder="Kurzantwort-Text (Optional)"
                        />
                        <span
                            v-if="$v.feedback.personName.$error"
                            class="feedback-validation-text"
                            >Die maximale Länge sind 255 Zeichen.
                        </span>
                    </div>
                </div>
            </div>
            <div class="feedback-question">
                <div class="row">
                    <div class="column">
                        <label
                            for="feedback-negative-question"
                            class="feedback-label"
                            >Was hat Dir im Rahmen der Fortbildung nicht
                            gefallen?</label
                        >
                        <input
                            type="text"
                            v-model="$v.feedback.negativeQuestion.$model"
                            @change="$emit('feedback', feedback)"
                            id="feedback-negative-question"
                            placeholder="Langantwort-Text (Optional)"
                        />
                        <span
                            v-if="$v.feedback.negativeQuestion.$error"
                            class="feedback-validation-text"
                            >Die maximale Länge sind 255 Zeichen.
                        </span>
                    </div>
                </div>
            </div>
            <div class="feedback-question">
                <div class="row">
                    <div class="column">
                        <label
                            for="feedback-positive-question"
                            class="feedback-label"
                            >Was hat Dir besonders gut gefallen?</label
                        >
                        <input
                            type="text"
                            v-model="$v.feedback.positiveQuestion.$model"
                            @change="$emit('feedback', feedback)"
                            id="feedback-positive-question"
                            placeholder="Langantwort-Text (Optional)"
                        />
                        <span
                            v-if="$v.feedback.positiveQuestion.$error"
                            class="feedback-validation-text"
                            >Die maximale Länge sind 255 Zeichen.
                        </span>
                    </div>
                </div>
            </div>
            <div class="feedback-question">
                <div class="row">
                    <div class="column">
                        <label class="feedback-label required-label"
                            >Kannst Du die Teilnahme an dieser Fortbildung
                            weiterempfehlen?</label
                        >
                        <div class="feedback-radio-button-container">
                            <input
                                type="radio"
                                value="yes"
                                v-model="
                                    $v.feedback.recommendationQuestion.$model
                                "
                                @change="$emit('feedback', feedback)"
                                id="feedback-recommendation-question-yes"
                                placeholder="Langantwort-Text (Optional)"
                            />
                            <label for="feedback-recommendation-question-yes"
                                >Ja</label
                            >
                        </div>
                        <div class="feedback-radio-button-container">
                            <input
                                type="radio"
                                value="no"
                                v-model="
                                    $v.feedback.recommendationQuestion.$model
                                "
                                @change="$emit('feedback', feedback)"
                                id="feedback-recommendation-question-no"
                                placeholder="Langantwort-Text (Optional)"
                            />
                            <label for="feedback-recommendation-question-no"
                                >Nein</label
                            >
                        </div>
                        <span
                            v-if="$v.feedback.recommendationQuestion.$error"
                            class="feedback-validation-text"
                            >Bitte wählen.
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { maxLength, required } from 'vuelidate/lib/validators';

export default {
    data: function() {
        return {
            feedback: {
                personName: '',
                negativeQuestion: '',
                positiveQuestion: '',
                recommendationQuestion: ''
            }
        };
    },
    validations: {
        feedback: {
            personName: { maxLength: maxLength(255) },
            negativeQuestion: { maxLength: maxLength(255) },
            positiveQuestion: { maxLength: maxLength(255) },
            recommendationQuestion: { required }
        }
    }
};
</script>

<style lang="scss" scoped>
.feedback-tip-text {
    margin-top: $space-s;
    margin-bottom: $space-xl;
}
.feedback-question {
    margin-bottom: $space-l;
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
    border: $red 1px solid;
    color: $red;
}
.feedback-validation-text {
    color: $red;
    font-size: $font-xs;
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
    margin-bottom: $space-s;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
}
.column {
    display: flex;
    flex-direction: column;
    flex: 1;
}
</style>
