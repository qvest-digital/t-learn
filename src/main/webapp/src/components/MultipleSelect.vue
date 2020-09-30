<template>
    <div>
        <v-select
            class="multiple-select"
            id="category"
            placeholder="Bitte wählen"
            multiple
            v-model="updatedCategories"
            :options="categories"
            @input="$emit('input', updatedCategories)"
        />
    </div>
</template>
<script>
export default {
    data: function() {
        return {
            updatedCategories: this.selectedCategories
        };
    },
    props: {
        selectedCategories: {
            type: Array,
            required: true
        },
        categories: {
            type: Array,
            required: true
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
    height: 36px;
    .vs__dropdown-toggle {
        border: solid 1px $grey;
        height: 36px;
        padding: 0; //overrides defaults
        .vs__selected-options {
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
    background: url('../assets/images/down.svg') no-repeat right #fff;
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
