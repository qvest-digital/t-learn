<template>
    <div data-testid="confirmModal" class="confirm-modal-overlay">
        <div class="confirm-modal-container">
            <div data-testid="confirmModalTitle" class="confirm-modal-title">
                {{ modalTitle }}
                <span :title="extraTitle" class="title-bold">
                    {{ extraTitle }}
                </span>
            </div>
            <slot></slot>
            <div class="confirm-modal-footer">
                <button @click="$emit('cancel')" class="button secondary">
                    {{ cancelButtonTitle }}
                </button>
                <button @click="$emit('confirm')" class="button primary">
                    {{ confirmButtonTitle }}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        modalTitle: {
            default: 'Bestätigung',
            type: String
        },
        extraTitle: {
            default: '',
            type: String
        },
        confirmButtonTitle: {
            default: 'JA',
            type: String
        },
        cancelButtonTitle: {
            default: 'NEIN',
            type: String
        }
    }
};
</script>

<style lang="scss" scoped>
.confirm-modal-overlay {
    background: $overlay-background;
    bottom: 0;
    left: 0;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 9999;
}
.confirm-modal-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: $container-m;
    background-color: $white;
    padding: $space-s;
    height: auto;
    max-height: $container-l;
    overflow-y: auto;
    border-radius: $border-radius-s;
    line-height: 1.6;
}
.confirm-modal-title {
    font-size: $font-l;
    font-weight: $normal;
    margin-bottom: $space-s;
    max-width: $container-m;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.title-bold {
    font-weight: $bold;
}
.confirm-modal-footer {
    margin-top: $space-xl;
    margin-right: $space-xs;
    display: flex;
    justify-content: flex-end;

    button {
        margin-left: $space-s;
    }
}
</style>
