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
                <label for="trainer" class="form-label required-label"
                    >Veranstalter*in</label
                >
                <input
                    type="text"
                    v-model="$v.course.trainer.$model"
                    :class="validationStateClass('course.trainer')"
                    id="trainer"
                    placeholder="Veranstalter*in"
                />
                <span
                    v-if="$v.course.trainer.$error"
                    class="form-validation-text"
                >
                    Veranstalter*in ist ein Pflichtfeld und die maximale Länge
                    sind 255 Zeichen.
                </span>
            </div>
            <div class="column">
                <label for="organizer" class="form-label"
                    >Ansprechpartner*in</label
                >
                <input
                    type="text"
                    v-model="$v.course.organizer.$model"
                    id="organizer"
                    :class="validationStateClass('course.organizer')"
                    placeholder="Ansprechpartner*in"
                />
                <span
                    v-if="$v.course.organizer.$error"
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
                <label for="location" class="form-label">Ort</label>

                <select
                    v-model="course.location"
                    id="location"
                    class="input-location"
                >
                    <option
                        v-for="location in locations"
                        :key="location.text"
                        :value="location.value"
                    >
                        {{ location.text }}
                    </option>
                </select>
            </div>
        </div>

        <div class="row">
            <div class="column">
                <label for="address" class="form-label"
                    >Veranstaltungsadresse</label
                >
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
                <label for="category" class="form-label">Kategorie </label>
                <v-select
                    class="select-category"
                    id="category"
                    placeholder="Bitte wählen"
                    multiple
                    v-model="selectedCategories"
                    :options="categories"
                    @input="onCategorySelect"
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
            selectedCategories: null,
            courseTypes: [
                { value: null, text: 'Bitte wählen' },
                { value: 'EXTERNAL', text: 'Extern' },
                { value: 'INTERNAL', text: 'Intern' }
            ],
            locations: [
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
            trainer: {
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
            organizer: {
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
        },
        onCategorySelect() {
            console.log(this.selectedCategories);
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
    border-radius: 4px;
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
    background: url('../assets/images/down.svg') no-repeat right $white;
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

// v-select style
.select-category {
    font-size: $font-s;
    border-radius: 4px;
    margin: 0 $space-xs;
    height: 36px;
    .vs__dropdown-toggle {
        border: solid 1px $grey;
        height: 36px;
        padding: 0; //overrides defaults
        .vs__selected-options {
            .vs__selected {
                background-color: $light-grey;
                padding: 0 0 0 $space-xs;
                border-radius: 4px;
                height: 24px;
            }
            .vs__search {
                margin: 0; //overrides defaults
            }
        }
    }
}

.select-category .vs__actions {
    padding: $space-s;
    background: url('../assets/images/down.svg') no-repeat right #fff;
}
.select-category .vs__deselect {
    padding: $space-xs $space-m $space-xs 0;
    background: url('../assets/images/close.svg') no-repeat right $light-grey;
}
.select-category .vs__dropdown-option--highlight {
    background: $medium-grey;
    color: $black;
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
