<template>
    <div class="input-form-container">
        <div class="row">
            <div class="column">
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
                    >Titel / Thema ist ein Pflichtfeld und die maximale Länge
                    sind 255 Zeichen.
                </span>
            </div>
        </div>
        <div class="row">
            <div class="column">
                <label for="organizer" class="form-label required-label"
                    >Veranstalter*in</label
                >
                <input
                    type="text"
                    v-model="$v.course.organizer.$model"
                    :class="validationStateClass('course.organizer')"
                    id="organizer"
                    placeholder="Veranstalter*in"
                />
                <span
                    v-if="$v.course.organizer.$error"
                    class="form-validation-text"
                >
                    Veranstalter*in ist ein Pflichtfeld und die maximale Länge
                    sind 255 Zeichen.
                </span>
            </div>
            <div class="column">
                <label for="contactPerson" class="form-label"
                    >Ansprechpartner*in</label
                >
                <input
                    type="text"
                    v-model="$v.course.contactPerson.$model"
                    id="contactPerson"
                    :class="validationStateClass('course.contactPerson')"
                    placeholder="Ansprechpartner*in"
                />
                <span
                    v-if="$v.course.contactPerson.$error"
                    class="form-validation-text"
                >
                    Die maximale Länge sind 255 Zeichen.
                </span>
            </div>
        </div>
        <div class="row">
            <div class="column">
                <label for="start-date" class="form-label">Start</label>
                <input
                    type="text"
                    v-model="$v.startDateRaw.$model"
                    :class="validationStateClass('startDateRaw')"
                    id="start-date"
                    placeholder="DD.MM.YYYY HH:MM"
                />
                <span
                    v-if="$v.startDateRaw.$error"
                    class="form-validation-text"
                >
                    Datum muss dem Muster "DD.MM.YYYY HH:MM" entsprechen und vor
                    dem Ende-Datum liegen.
                </span>
            </div>
            <div class="column">
                <label for="end-date" class="form-label">Ende</label>
                <input
                    type="text"
                    v-model="$v.endDateRaw.$model"
                    :class="validationStateClass('endDateRaw')"
                    id="end-date"
                    placeholder="DD.MM.YYYY HH:MM"
                />
                <span v-if="$v.endDateRaw.$error" class="form-validation-text">
                    Datum muss dem Muster "DD.MM.YYYY HH:MM" entsprechen und
                    nach dem Start-Datum liegen.
                </span>
            </div>
        </div>
        <div class="row">
            <div class="column">
                <label for="course-type" class="form-label required-label"
                    >Veranstaltungsart</label
                >
                <select
                    v-model="$v.course.courseType.$model"
                    :class="validationStateClass('course.courseType')"
                    id="course-type"
                >
                    <option
                        v-for="courseType in courseTypes"
                        :key="courseType.text"
                        :value="courseType.value"
                    >
                        {{ courseType.text }}
                    </option>
                </select>
                <span
                    v-if="$v.course.courseType.$error"
                    class="form-validation-text"
                >
                    Veranstaltungsart ist ein Pflichtfeld und die maximale Länge
                    sind 255 Zeichen.
                </span>
            </div>
            <div class="column">
                <label for="courseForm" class="form-label">
                    Veranstaltungsform
                </label>
                <!-- eslint-disable vue/no-mutating-props -->
                <select
                    v-model="course.courseForm"
                    id="courseForm"
                    class="input-location"
                >
                    <!-- eslint-enable -->
                    <option
                        v-for="courseForm in courseForms"
                        :key="courseForm.text"
                        :value="courseForm.value"
                    >
                        {{ courseForm.text }}
                    </option>
                </select>
            </div>
            <div class="column">
                <label for="price" class="form-label">
                    Preis
                </label>
                <input
                    type="text"
                    v-model="$v.course.price.$model"
                    id="price"
                    :class="validationStateClass('course.price')"
                    placeholder="Preis"
                />
                <span
                    v-if="$v.course.price.$error"
                    class="form-validation-text"
                >
                    Die maximale Länge sind 255 Zeichen.
                </span>
            </div>
        </div>

        <div class="row">
            <div class="column">
                <label for="address" class="form-label">Ort</label>
                <input
                    type="text"
                    v-model="$v.course.address.$model"
                    id="address"
                    :class="validationStateClass('course.address')"
                    placeholder="postalische Adresse"
                />
                <span
                    v-if="$v.course.address.$error"
                    class="form-validation-text"
                >
                    Die maximale Länge sind 255 Zeichen.
                </span>
            </div>
            <div class="column">
                <label for="executionType" class="form-label"
                    >Durchführung</label
                >
                <!-- eslint-disable vue/no-mutating-props -->
                <select
                    v-model="course.executionType"
                    id="executionType"
                    class="input-location"
                >
                    <!-- eslint-enable -->
                    <option
                        v-for="executionType in executionTypes"
                        :key="executionType.text"
                        :value="executionType.value"
                    >
                        {{ executionType.text }}
                    </option>
                </select>
            </div>
        </div>
        <div class="row">
            <div class="column">
                <label for="link" class="form-label"
                    >Weiterführender Link</label
                >
                <input
                    type="text"
                    v-model="$v.course.link.$model"
                    :class="validationStateClass('course.link')"
                    id="link"
                    placeholder="https://"
                />
                <span v-if="$v.course.link.$error" class="form-validation-text">
                    Der Link muss ein gültiger URL sein, mit den Protokollen
                    "http" oder "https" beginnen und darf nur maximal 1000
                    Zeichen lang sein.
                </span>
            </div>
        </div>
        <div class="row">
            <div class="column">
                <label for="category" class="form-label">Kategorie</label>
                <MultipleSelect
                    :selectedCategories="selectedCategories"
                    :categories="categories"
                    @input="onCategorySelect"
                    id="category"
                />
            </div>
        </div>
        <div class="row">
            <div class="column">
                <label for="target-audience" class="form-label"
                    >Zielgruppe</label
                >
                <textarea
                    v-model="$v.course.targetAudience.$model"
                    :class="validationStateClass('course.targetAudience')"
                    id="target-audience"
                    placeholder="An wen richtet sich die Veranstaltung"
                />
                <span
                    v-if="$v.course.targetAudience.$error"
                    class="form-validation-text"
                >
                    Die maximale Länge sind 2000 Zeichen.
                </span>
            </div>
        </div>
        <div class="row">
            <div class="column">
                <label for="description" class="form-label"
                    >Beschreibung / Inhalt</label
                >
                <textarea
                    v-model="$v.course.description.$model"
                    :class="validationStateClass('course.description')"
                    id="description"
                    placeholder="Beschreibung"
                />
                <span
                    v-if="$v.course.description.$error"
                    class="form-validation-text"
                >
                    Die maximale Länge sind 2000 Zeichen.
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import { isValid, parse } from 'date-fns';
import { helpers, maxLength, required, url } from 'vuelidate/lib/validators';
import MultipleSelect from './MultipleSelect';

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
    components: { MultipleSelect },
    data: function() {
        return {
            startDateRaw: null,
            endDateRaw: null,
            selectedCategories: [],
            courseForms: [
                { value: null, text: 'Bitte wählen' },
                { value: 'MEETUP', text: 'MeetUp' },
                { value: 'CONFERENCE', text: 'Barcamp/Konferenz' },
                { value: 'LANGUAGE_COURSE', text: 'Sprachkurs' },
                { value: 'CERTIFICATION', text: 'Zertifizierung' },
                { value: 'STUDY_GROUP', text: 'Lerngruppe' },
                { value: 'LECTURE', text: 'Vortrag' },
                { value: 'SEMINAR', text: 'Seminar' },
                { value: 'WORKSHOP', text: 'Workshop' }
            ],
            courseTypes: [
                { value: null, text: 'Bitte wählen' },
                { value: 'EXTERNAL', text: 'Extern' },
                { value: 'INTERNAL', text: 'Intern' }
            ],
            executionTypes: [
                { value: null, text: 'Bitte wählen' },
                { value: 'REMOTE', text: 'Remote' },
                { value: 'ONSITE', text: 'Präsenz' }
            ],
            categories: [
                'fontend',
                'backend',
                'css',
                'javascript',
                'vue',
                'java'
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
                required,
                maxLength: maxLength(255)
            },
            organizer: {
                required,
                maxLength: maxLength(255)
            },
            courseType: {
                required,
                maxLength: maxLength(255)
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
            },
            address: {
                maxLength: maxLength(255)
            },
            contactPerson: {
                maxLength: maxLength(255)
            },
            price: {
                maxLength: maxLength(255)
            }
        }
    },
    watch: {
        course: function(val) {
            this.startDateRaw = this.$options.filters.formatDate(val.startDate);
            this.endDateRaw = this.$options.filters.formatDate(val.endDate);
        },
        startDateRaw: function(val) {
            // eslint-disable-next-line vue/no-mutating-props
            this.course.startDate = this.parseValidDate(val);
        },
        endDateRaw: function(val) {
            // eslint-disable-next-line vue/no-mutating-props
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
        },
        onCategorySelect(updatedCategories) {
            this.selectedCategories = updatedCategories;
        }
    }
};
</script>

<style lang="scss" scoped>
// validation and label

.form-label {
    font-size: $font-xs;
    color: $grey;
    margin: 0 $space-xs $space-xs $space-xs;
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

.form-validation-text {
    color: $red;
    font-size: $font-xs;
    margin: $space-xs $space-xs 0 $space-xs;
}

//input, select and textarea
input,
textarea,
select {
    margin: 0 $space-xs;
    border-radius: $border-radius-xs;
    border: solid 1px $grey;
    height: 34px;
    font-size: $font-xs;
    &:focus {
        outline-width: 1px;
        outline-color: $dark-grey;
    }
}
select {
    cursor: pointer;
    appearance: none;
    background: url('../assets/images/chevron-down.svg') no-repeat right $white;
}
select,
input {
    background-color: $white;
    padding: 0 $space-xs;
}

textarea {
    min-height: 42px;
    resize: none;
    padding: $space-xs;
}

// container
.input-form-container {
    width: $container-l;
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
