<template>
    <div data-testid="confirmModal" class="confirm-modal-overlay">
        <div class="confirm-modal-container">
            <div data-testid="confirmModalTitle" class="confirm-modal-title">
                <span>{{ modalTitle }}</span>
                <span :title="extraTitle" class="bold-title">
                    {{ extraTitle }}
                </span>
            </div>
            <div
                data-testid="confirmModalContent"
                class="confirm-modal-content"
                :title="text"
            >
                {{ text }}
            </div>
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
        },
        text: {
            default: 'Sind Sie sicher?',
            type: String
        }
    }
};
</script>

<style lang="scss">
.confirm-modal-overlay {
    background: rgba(74, 74, 74, 0.8);
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
    transform: translate(-50.1%, -50.1%);
    width: 500px;
    background-color: $white;
    padding: $s-space;
    height: auto;
    max-height: 500px;
    overflow-y: auto;
    border-radius: 8px;
    line-height: 1.6;
}
.confirm-modal-title {
    font-size: $l-font;
    font-weight: $normal;
    margin-bottom: $s-space;
    max-width: 490px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.bold-title {
    font-weight: $bold;
}
.confirm-modal-footer {
    margin-top: $xl-space;
    margin-right: $xs-space;
    display: flex;
    justify-content: flex-end;

    button {
        margin-left: $s-space;
    }
}
</style>
