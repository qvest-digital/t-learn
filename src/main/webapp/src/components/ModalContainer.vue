<template>
    <div
        v-if="visible"
        data-testid="ModalContainer"
        class="container-modal-overlay"
    >
        <div class="container-modal-container">
            <div
                data-testid="modalContainerTitle"
                class="container-modal-title"
            >
                {{ modalTitle }}
                <span :title="extraTitle" class="title-bold">
                    {{ extraTitle }}
                </span>
            </div>
            <slot></slot>
            <div class="container-modal-footer">
                <button
                    @click="hideModal"
                    class="button secondary"
                    id="cancel-button"
                >
                    {{ cancelButtonTitle }}
                </button>
                <button
                    @click="$emit('confirm')"
                    class="button primary"
                    id="confirm-button"
                >
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
    },
    data() {
        return {
            visible: false
        };
    },
    methods: {
        showModal() {
            this.visible = true;
        },
        hideModal() {
            this.visible = false;
        }
    }
};
</script>

<style lang="scss" scoped>
.container-modal-overlay {
    background: $overlay-background;
    bottom: 0;
    left: 0;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 9999;
}
.container-modal-container {
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
.container-modal-title {
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
.container-modal-footer {
    margin-top: $space-xl;
    margin-right: $space-xs;
    display: flex;
    justify-content: flex-end;

    button {
        margin-left: $space-s;
    }
}
</style>
