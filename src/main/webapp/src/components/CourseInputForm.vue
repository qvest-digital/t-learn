<template>
    <div>
        <div class="mb-3">
            <label for="title" class="form-label required-label"
                >Titel / Thema</label
            >
            <b-form-input
                v-model="$v.course.title.$model"
                :state="validateState('course.title')"
                id="title"
                size="lg"
                placeholder="Veranstaltungsbezeichnung"
            />
            <b-form-invalid-feedback
                >Titel / Thema ist ein Pflichtfeld.
            </b-form-invalid-feedback>
        </div>

        <b-row class="mb-3">
            <b-col>
                <label for="trainer" class="form-label required-label"
                    >Trainer</label
                >
                <b-form-input
                    v-model="$v.course.trainer.$model"
                    :state="validateState('course.trainer')"
                    id="trainer"
                    placeholder="Trainer"
                />
                <b-form-invalid-feedback
                    >Trainer ist ein Pflichtfeld.
                </b-form-invalid-feedback>
            </b-col>
            <b-col>
                <label for="organizer" class="form-label">Organisator</label>
                <b-form-input
                    v-model="course.organizer"
                    id="organizer"
                    placeholder="Organisator"
                />
            </b-col>
        </b-row>

        <b-row class="mb-3">
            <b-col>
                <label for="startDate" class="form-label">Start</label>
                <b-form-input
                    v-model="$v.startDateRaw.$model"
                    :state="validateState('startDateRaw')"
                    id="startDate"
                    placeholder="DD.MM.YYYY HH:MM"
                />
                <b-form-invalid-feedback>
                    Datum muss dem Muster "DD.MM.YYYY HH:MM" entsprechen und vor
                    dem Ende-Datum liegen.
                </b-form-invalid-feedback>
            </b-col>
            <b-col>
                <label for="endDate" class="form-label">Ende</label>
                <b-form-input
                    v-model="$v.endDateRaw.$model"
                    :state="validateState('endDateRaw')"
                    id="endDate"
                    placeholder="DD.MM.YYYY HH:MM"
                />
                <b-form-invalid-feedback>
                    Datum muss dem Muster "DD.MM.YYYY HH:MM" entsprechen und
                    nach dem Start-Datum liegen.
                </b-form-invalid-feedback>
            </b-col>
        </b-row>

        <b-row class="mb-3">
            <b-col>
                <label for="courseType" class="form-label required-label"
                    >Veranstaltungsart</label
                >
                <b-form-select
                    v-model="$v.course.courseType.$model"
                    :state="validateState('course.courseType')"
                    :options="courseTypes"
                    id="courseType"
                />
                <b-form-invalid-feedback
                    >Veranstaltungsart ist ein Pflichtfeld.
                </b-form-invalid-feedback>
            </b-col>
            <b-col>
                <label for="location" class="form-label">Ort</label>
                <b-form-select
                    v-model="course.location"
                    :options="locations"
                    id="location"
                />
            </b-col>
        </b-row>

        <b-row class="mb-3">
            <b-col>
                <label for="address" class="form-label"
                    >Veranstaltungsadresse</label
                >
                <b-form-input
                    v-model="course.address"
                    id="address"
                    placeholder="postalische Adresse"
                />
            </b-col>
            <b-col>
                <label for="link" class="form-label"
                    >Weiterführender Link</label
                >
                <b-form-input
                    v-model="$v.course.link.$model"
                    :state="validateState('course.link')"
                    id="link"
                    placeholder="https://"
                />
                <b-form-invalid-feedback>
                    Der Link muss ein gültiger URL sein, mit den Protokollen
                    "http" oder "https" beginnen und darf nur maximal 1000
                    Zeichen lang sein.
                </b-form-invalid-feedback>
            </b-col>
        </b-row>

        <b-row class="mb-3">
            <b-col>
                <label for="targetAudience" class="form-label"
                    >Zielgruppe</label
                >
                <b-form-textarea
                    v-model="$v.course.targetAudience.$model"
                    :state="validateState('course.targetAudience')"
                    id="targetAudience"
                    placeholder="Welche Zielgruppe soll mit der Veranstaltung angesprochen werden"
                    rows="3"
                    max-rows="6"
                />
                <b-form-invalid-feedback>
                    Die maximale Länge sind 2000 Zeichen.
                </b-form-invalid-feedback>
            </b-col>
        </b-row>
        <b-row class="mb-3">
            <b-col>
                <label for="description" class="form-label"
                    >Beschreibung / Inhalt</label
                >
                <b-form-textarea
                    v-model="$v.course.description.$model"
                    :state="validateState('course.description')"
                    id="description"
                    placeholder="Beschreibung"
                    rows="3"
                    max-rows="6"
                />
                <b-form-invalid-feedback>
                    Die maximale Länge sind 2000 Zeichen.
                </b-form-invalid-feedback>
            </b-col>
        </b-row>
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
            },
            description: {
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
        validateState: function(path) {
            const { $dirty, $error } = path
                .split('.')
                .reduce(
                    (previous, current) =>
                        previous ? previous[current] : null,
                    this.$v
                );

            return $dirty ? !$error : null;
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
    color: red;
    font-weight: bold;
    content: '\00a0*';
}
</style>
