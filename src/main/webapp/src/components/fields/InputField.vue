<template>
    <div class="root-element">
        <label :for="id" class="form-label">
            {{ label }}
        </label>
        <input
            type="text"
            :id="id"
            :name="id"
            :placeholder="placeholder"
            v-model="$v.internalInput.$model"
            @input="$emit('input', internalInput)"
        />
        <span
            v-if="$v.$error"
            class="form-validation-text"
            data-testid="inputFieldError"
        >
            {{ this.errorMessage }}
        </span>
    </div>
</template>

<script>
export default {
    name: 'InputField',
    props: {
        id: {
            type: String,
            required: true
        },
        label: {
            type: String,
            required: true
        },
        placeholder: {
            type: String,
            required: true
        },
        value: {
            type: String
        },
        validations: {
            type: Object,
            required: true
        },
        errorMessage: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            internalInput: this.value
        };
    },
    validations() {
        return {
            internalInput: this.validations
        };
    },
    watch: {
        value(value) {
            this.internalInput = value;
        }
    }
};
</script>

<style lang="scss" scoped>
.root-element {
    display: grid;
    display: -ms-grid;
}

.form-label {
    font-size: $font-xs;
    color: $grey;
    margin: 0 $space-xs $space-xs $space-xs;
}

input {
    margin: 0 $space-xs;
    border-radius: $border-radius-xs;
    border: solid 1px $grey;
    height: 34px;
    font-size: $font-xs;
    background-color: $white;
    padding: 0 $space-xs;

    &:focus {
        outline-width: 1px;
        outline-color: $dark-grey;
    }
}

.form-validation-text {
    color: $red;
    font-size: $font-xs;
    margin: $space-xs $space-xs 0 $space-xs;
}
</style>
