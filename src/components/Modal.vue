<script setup>
import { ref, watch } from 'vue';

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
</script>

<template>
    <div v-if="visible" class="modal">
        <div class="modal-content">
            <span class="close" @click="close">&times;</span>
            <h2>Edit Card</h2>
            <label for="contents">Contents:</label>
            <input id="contents" v-model="localContents" />
            <label for="color">Color:</label>
            <input id="color" type="color" v-model="localColor" />
            <button @click="save">Save</button>
        </div>
    </div>
</template>

<style scoped>
.modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
    background-color: #fefefe;
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
}

.close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
}

.close:hover,
.close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
}
</style>