<template>
    <label class="container">
        <span :class="validationClass">
            {{ label }}
        </span>
        <input
            type="radio"
            :value="label"
            :name="name"
            :id="id"
            v-model="radioButtonValue"
        />
        <span class="checkmark"></span>
    </label>
</template>

<script>
export default {
    name: 'RadioButton',
    props: {
        name: {
            type: String,
            default: 'option'
        },
        label: {
            type: String,
            required: true
        },
        value: {
            required: true
        },
        id: {
            type: String,
            required: true
        },
        validationClass: {
            type: String,
            default: ''
        }
    },
    computed: {
        radioButtonValue: {
            get: function () {
                return this.value;
            },
            set: function () {
                this.$emit('change', this.label);
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.is-invalid {
    color: $red;
}

/* The container */
.container {
    display: block;
    position: relative;
    padding-left: $space-xl;
    margin-bottom: $space-s;
    cursor: pointer;
    font-size: $font-m;
}

/* Hide the browser's default radio button */
.container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
}

/* Create a custom radio button */
.checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 24px;
    width: 24px;
    background-color: $medium-grey;
    border-radius: $border-radius-m;
}

/* On mouse-over, add a background color */
.container:hover input ~ .checkmark {
    background-color: $medium-red;
}

/* When the radio button is checked, add a background color */
.container input:checked ~ .checkmark {
    background-color: $red;
}

/* Create the indicator (the dot/circle - hidden when not checked) */
.checkmark:after {
    content: '';
    position: absolute;
    display: none;
}

/* Show the indicator (dot/circle) when checked */
.container input:checked ~ .checkmark:after {
    display: block;
}

/* Style the indicator (dot/circle) */
.container .checkmark:after {
    top: 8px;
    left: 8px;
    width: 8px;
    height: 8px;
    border-radius: $border-radius-xs;
    background: $white;
}
</style>
