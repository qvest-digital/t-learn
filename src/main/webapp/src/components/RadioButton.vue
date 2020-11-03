<template>
    <div class="radio-button-container">
        <label class="radio">
            <input
                type="radio"
                :value="label"
                :name="name"
                :id="id"
                v-model="radioButtonValue"
            />
            <span :class="validationClass">{{ label }}</span>
        </label>
    </div>
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
            get: function() {
                return this.value;
            },
            set: function() {
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
</style>
