<script setup>
import { onMounted, onUnmounted } from 'vue';

const props = defineProps({
    visible: Boolean,
});

const emit = defineEmits(['close', 'save']);

const close = () => {
    emit('close');
};

const save = () => {
    emit('save');
};

const handleKeydown = (event) => {
    if (event.key === 'Escape') {
        close();
    }
};

onMounted(() => {
    window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown);
});
</script>

<template>
    <div v-if="visible" class="modal">
        <div class="modal-content">
            <span class="close" @click="close"><i class="bi bi-x"></i></span>
            <slot></slot>
            <button class="btn btn-primary" @click="save">Zapisz</button>

        </div>
    </div>
</template>

<style scoped>
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background-color: #fff;
    padding: 2em;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 90%;
    max-width: 500px;
    position: relative;
    animation: fadeIn 0.3s ease-out;
}

.close {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 1.5em;
    cursor: pointer;
    color: #aaa;
    transition: color 0.3s;
}

.close:hover {
    color: #000;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: scale(0.9);
    }

    to {
        opacity: 1;
        transform: scale(1);
    }
}
</style>