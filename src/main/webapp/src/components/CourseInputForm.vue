<template>
    <div>
        <label for="title" class="form-label required-label"
            >Titel / Thema</label
        >
        <input
            type="text"
            v-model="$v.course.title.$model"
            :class="validationStateClass('course.title')"
            id="title"
            placeholder="Veranstaltungsbezeichnung"
        />
        <span v-if="$v.course.title.$error" class="form-validation-text"
            >Titel / Thema ist ein Pflichtfeld.
        </span>

        <label for="trainer" class="form-label required-label">Trainer</label>
        <input
            type="text"
            v-model="$v.course.trainer.$model"
            :class="validationStateClass('course.trainer')"
            id="trainer"
            placeholder="Trainer"
        />
        <span v-if="$v.course.trainer.$error" class="form-validation-text">
            Trainer ist ein Pflichtfeld.
        </span>
        <label for="organizer" class="form-label">Organisator</label>
        <input
            type="text"
            v-model="course.organizer"
            id="organizer"
            placeholder="Organisator"
        />

        <label for="start-date" class="form-label">Start</label>
        <input
            type="text"
            v-model="$v.startDateRaw.$model"
            :class="validationStateClass('startDateRaw')"
            id="start-date"
            class="input-start-date"
            placeholder="DD.MM.YYYY HH:MM"
        />
        <span v-if="$v.startDateRaw.$error" class="form-validation-text">
            Datum muss dem Muster "DD.MM.YYYY HH:MM" entsprechen und vor dem
            Ende-Datum liegen.
        </span>

        <label for="end-date" class="form-label">Ende</label>
        <input
            type="text"
            v-model="$v.endDateRaw.$model"
            :class="validationStateClass('endDateRaw')"
            id="end-date"
            class="input-end-date"
            placeholder="DD.MM.YYYY HH:MM"
        />
        <span v-if="$v.endDateRaw.$error" class="form-validation-text">
            Datum muss dem Muster "DD.MM.YYYY HH:MM" entsprechen und nach dem
            Start-Datum liegen.
        </span>

        <label for="course-type" class="form-label required-label"
            >Veranstaltungsart</label
        >
        <select
            v-model="$v.course.courseType.$model"
            :class="validationStateClass('course.courseType')"
            id="course-type"
            class="input-course-type"
        >
            <option
                v-for="courseType in courseTypes"
                :key="courseType.text"
                :value="courseType.value"
                class="input-course-type-option"
            >
                {{ courseType.text }}
            </option>
        </select>
        <span v-if="$v.course.courseType.$error" class="form-validation-text">
            Veranstaltungsart ist ein Pflichtfeld.
        </span>

        <label for="location" class="form-label">Ort</label>

        <select v-model="course.location" id="location" class="input-location">
            <option
                v-for="location in locations"
                :key="location.text"
                :value="location.value"
                class="input-location-option"
            >
                {{ location.text }}
            </option>
        </select>

        <label for="address" class="form-label">Veranstaltungsadresse</label>
        <input
            type="text"
            v-model="course.address"
            id="address"
            class="input-address"
            placeholder="postalische Adresse"
        />

        <label for="link" class="form-label">Weiterführender Link</label>
        <input
            type="text"
            v-model="$v.course.link.$model"
            :class="validationStateClass('course.link')"
            id="link"
            class="input-link"
            placeholder="https://"
        />
        <span v-if="$v.course.link.$error" class="form-validation-text">
            Der Link muss ein gültiger URL sein, mit den Protokollen "http" oder
            "https" beginnen und darf nur maximal 1000 Zeichen lang sein.
        </span>

        <label for="target-audience" class="form-label">Zielgruppe</label>
        <textarea
            v-model="$v.course.targetAudience.$model"
            :class="validationStateClass('course.targetAudience')"
            id="target-audience"
            class="input-target-audience"
            placeholder="Veranstaltungsbeschreibung"
        />
        <span
            v-if="$v.course.targetAudience.$error"
            class="form-validation-text"
        >
            Die maximale Länge sind 2000 Zeichen.
        </span>
    </div>
</template>

<script>
import { isValid, parse } from 'date-fns';
import { helpers, maxLength, required, url } from 'vuelidate/lib/validators';

const parseDate = val => parse(val, 'dd.MM.yyyy H:m', new Date());

const validDate = val => !helpers.req(val) || isValid(parseDate(val));

const startBeforeEnd = (val, model) => {
    const startDate = parseDate(model.startDateRaw);
    const endDate = parseDate(model.endDateRaw);

    if (!isValid(startDate) || !isValid(endDate)) {
        return true;
    }
    return startDate.getTime() < endDate.getTime();
};

export default {
    name: 'CourseInputForm',
    data: function() {
        return {
            startDateRaw: null,
            endDateRaw: null,
            courseTypes: [
                { value: null, text: 'Bitte wählen' },
                { value: 'EXTERNAL', text: 'Extern' },
                { value: 'INTERNAL', text: 'Intern' }
            ],
            locations: [
                { value: null, text: 'Bitte wählen' },
                { value: 'REMOTE', text: 'Remote' },
                { value: 'ONSITE', text: 'Präsenz' }
            ]
        };
    },
    props: ['course'],
    validations: {
        startDateRaw: {
            validDate,
            startBeforeEnd
        },
        endDateRaw: {
            validDate,
            startBeforeEnd
        },
        course: {
            title: {
                required
            },
            trainer: {
                required
            },
            courseType: {
                required
            },
            link: {
                url,
                protocol: helpers.regex('protocol', /https?\W/),
                maxLength: maxLength(1000)
            },
            targetAudience: {
                maxLength: maxLength(2000)
            }
        }
    },
    watch: {
        course: function(val) {
            this.startDateRaw = this.$options.filters.formatDate(val.startDate);
            this.endDateRaw = this.$options.filters.formatDate(val.endDate);
        },
        startDateRaw: function(val) {
            this.course.startDate = this.parseValidDate(val);
        },
        endDateRaw: function(val) {
            this.course.endDate = this.parseValidDate(val);
        },
        ready(val) {
            this.$emit('ready', val);
        }
    },
    computed: {
        ready() {
            return !this.$v.$invalid;
        }
    },
    methods: {
        touch: function() {
            this.$v.$touch();
            this.$emit('ready', !this.$v.$invalid);
        },
        validationStateClass: function(path) {
            const { $dirty, $error } = path
                .split('.')
                .reduce(
                    (previous, current) =>
                        previous ? previous[current] : null,
                    this.$v
                );

            return $dirty && $error ? 'is-invalid' : 'is-valid';
        },
        parseValidDate: function(val) {
            const date = parseDate(val);
            return isValid(date) ? date.toISOString() : null;
        }
    }
};
</script>

<style scoped>
.required-label::after {
    color: #cc0000;
    font-weight: bold;
    content: '\00a0*';
}
.is-invalid {
    border: #cc0000 1px solid;
}

.form-validation-text {
    color: #cc0000;
}
input {
    outline: none;
}
</style>
