<script setup>
import { ref } from 'vue';
import Modal from './Modal.vue';
import { useDraggableStore } from '../stores/draggableStore'

const props = defineProps({
    data: {
        type: Object,
        default: {
            id: -1,
            color: "#ffeb3b",
            content: "Lorem"
        }
    }
});

const contents = ref(props.data.content);
const color = ref(props.data.color);
const isModalVisible = ref(false);

const draggableStore = useDraggableStore();

const openModal = () => {
    isModalVisible.value = true;
    draggableStore.setDraggable(false);
};

const closeModal = () => {
    isModalVisible.value = false;
    allowDrag();
};

const saveChanges = (data) => {
    contents.value = data.contents;
    color.value = data.color;
    closeModal();
};

const allowDrag = () => {
    if (isModalVisible.value) return;
    draggableStore.setDraggable(true);
};

const notAllowDrag = () => {
    draggableStore.setDraggable(false);
};

</script>

<template>
    <div sortItem class="post-it-note" :style="{ backgroundColor: color }" :data-card-id="data.id">
        <button @click="openModal" class="edit-button" @mouseover="notAllowDrag()" @mouseleave="allowDrag()"><i
                class="bi bi-pencil"></i></button>
        <div class="contents">{{ contents }}</div>
        <Modal :visible="isModalVisible" :contents="contents" :color="color" @close="closeModal" @save="saveChanges" />
    </div>
</template>

<style scoped>
.post-it-note {
    border: 1px solid #efefef;
    padding: 1em;
    width: 10em;
    aspect-ratio: 1;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
    /* transform: rotate(-2deg); */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
}

.edit-button {
    position: absolute;
    top: 0.5em;
    right: 0.5em;
    background-color: #ffeb3b;
    border: none;
    border-radius: 25%;
    width: 2em;
    height: 2em;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
    transition: background-color 0.3s, transform 0.3s;
}

.edit-button:hover {
    background-color: #fdd835;

}

.contents {
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
}
</style>