<template>
    <div>
        <v-select
            class="multiple-select"
            id="multiselect"
            placeholder="Bitte wählen"
            multiple
            :closeOnSelect="false"
            v-model="internalValue"
            :options="internalOptions"
            @input="$emit('input', internalValue)"
        />
    </div>
</template>
<script>
export default {
    data: function () {
        return {
            internalValue: this.value,
            internalOptions: this.options
        };
    },
    props: {
        value: {
            type: Array
        },
        options: {
            type: Array
        }
    },
    watch: {
        value(value) {
            this.internalValue = value;
        },
        options(options) {
            this.internalOptions = options;
        }
    }
};
</script>
<style lang="scss">
// v-select style
.multiple-select {
    font-size: $font-s;
    border-radius: $border-radius-xs;
    margin: 0 $space-xs;
    min-height: 36px;
    .vs__dropdown-toggle {
        border: solid 1px $grey;
        min-height: 36px;
        .vs__selected-options {
            padding: 2px;
            .vs__selected {
                background-color: $light-grey;
                padding: 0 0 0 $space-xs;
                border-radius: $border-radius-xs;
                height: 24px;
            }
            .vs__search {
                margin: 0; //overrides defaults
            }
        }
    }
}

.multiple-select .vs__actions {
    padding: $space-s;
    background: url('../assets/images/chevron-down.svg') no-repeat $space-xs
        center $white;
}
.multiple-select .vs__deselect {
    padding: $space-xs $space-m $space-xs 0;
    background: url('../assets/images/close.svg') no-repeat right $light-grey;
}
.multiple-select .vs__dropdown-option--highlight {
    background: $medium-grey;
    color: $black;
}
</style>
