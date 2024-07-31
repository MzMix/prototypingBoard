<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue';

const props = defineProps({
    visible: Boolean,
    contents: String,
    color: String
});

const emit = defineEmits(['close', 'save']);

const localContents = ref(props.contents);
const localColor = ref(props.color);

watch(() => props.contents, (newContents) => {
    localContents.value = newContents;
});

watch(() => props.color, (newColor) => {
    localColor.value = newColor;
});

const close = () => {
    emit('close');
};

const save = () => {
    emit('save', { contents: localContents.value, color: localColor.value });
    close();
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
            <h2>Edit Card</h2>
            <label for="contents">Contents:</label>
            <input id="contents" v-model="localContents" />
            <label for="color">Color:</label>
            <input id="color" type="color" v-model="localColor" />
            <button class="save-button" @click="save">Save</button>
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

h2 {
    margin-top: 0;
}

label {
    display: block;
    margin-top: 1em;
    font-weight: bold;
}

input[type="text"],
input[type="color"] {
    width: calc(100% - 2em);
    padding: 0.5em;
    margin-top: 0.5em;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
}

input[type="color"] {
    height: 2em;
    padding: 0;
    border: none;
}

.save-button {
    margin-top: 1.5em;
    padding: 0.75em 1.5em;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.save-button:hover {
    background-color: #0056b3;
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