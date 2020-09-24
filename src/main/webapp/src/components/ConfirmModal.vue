<template>
    <div data-testid="confirmModal" class="confirm-modal-overlay">
        <div class="confirm-modal-container">
            <div data-testid="confirmModalTitle" class="confirm-modal-title">
                {{ modalTitle }}
            </div>
            <div
                data-testid="confirmModalContent"
                class="confirm-modal-content"
            >
                {{ text }}
            </div>
            <div class="confirm-modal-footer">
                <button @click="$emit('confirm')" class="button primary">
                    {{ confirmButtonTitle }}
                </button>
                <button @click="$emit('cancel')" class="button secondary">
                    {{ cancelButtonTitle }}
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
    background-color: $white;
    left: 50%;
    max-width: 433px;
    min-height: 453px;
    position: absolute;
    top: 50%;
    transform: translate(-50.1%, -50.1%);
    width: calc(100% - 30px);
    padding: 16px;
    height: auto;
    border-radius: 8px;
}
</style>
