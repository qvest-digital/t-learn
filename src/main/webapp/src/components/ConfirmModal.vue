<template>
    <div class="confirm-modal-overlay">
        <div class="confirm-modal-container">
            <div class="confirm-modal-title">
                {{ modalTitle }}
            </div>
            <div class="confirm-modal-content">
                {{ text }}
            </div>
            <div class="confirm-modal-footer">
                <button
                    data-testid="confirm-button"
                    @click="$emit('confirm')"
                    class="confirm-modal-confirm-button"
                >
                    {{ confirmButtonTitle }}
                </button>
                <button
                    data-testid="cancel-button"
                    @click="$emit('cancel')"
                    class="confirm-modal-cancel-button"
                >
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
            default: 'Ja',
            type: String
        },
        cancelButtonTitle: {
            default: 'Nein',
            type: String
        },
        text: {
            default: 'Sind Sie sicher?',
            type: String
        }
    }
};
</script>

<style scoped>
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
    background-color: white;
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
