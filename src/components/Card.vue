<script setup>
import { ref } from 'vue';
import Modal from './Modal.vue';
import { useDraggableStore } from '../stores/draggableStore'
import { useCardStore } from '../stores/cardStore';
import { getFontColorForBackfround } from '../utils/utils';

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
const cardStore = useCardStore();

const deleteCard = () => {
    let result = confirm("Czy na pewno chcesz usunąć tę kartę?");
    if (!result) return;
    cardStore.deleteCard(props.data.id);
};

const saveData = () => {
    cardStore.updateCard(props.data.id, contents.value, color.value);
    closeModal();
}

const openModal = () => {
    isModalVisible.value = true;
    draggableStore.setDraggable(false);
};

const closeModal = () => {
    isModalVisible.value = false;
    allowDrag();
};

const allowDrag = () => {
    if (isModalVisible.value) return;
    draggableStore.setDraggable(true);
};

const notAllowDrag = () => {
    draggableStore.setDraggable(false);
};

function getFontColor() { return getFontColorForBackfround(color.value); }

</script>

<template>
    <div sortItem class="post-it-note" :style="{ backgroundColor: color, color: getFontColor() }"
        :data-card-id="data.id">

        <button @click="deleteCard" class="delete-button" @mouseover="notAllowDrag()" @mouseleave="allowDrag()"><i
                class="bi bi-trash"></i></button>

        <button @click="openModal" class="edit-button" @mouseover="notAllowDrag()" @mouseleave="allowDrag()"><i
                class="bi bi-pencil"></i></button>

        <div class="contents">{{ contents }}</div>

        <Modal :visible="isModalVisible" @close="closeModal" @save="saveData">
            <h3 class="text-black">Edytuj</h3>

            <label for="contents" class="text-black">Zawartość:</label>
            <textarea id="contents" v-model="contents" />

            <label for="color" class="text-black">Kolor:</label>
            <input id="color" type="color" class="form-control m-auto mb-4" v-model="color" />
        </Modal>

    </div>
</template>

<style scoped>
.post-it-note {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    width: 10em;
    aspect-ratio: 1;
    padding: 1em;

    border: 1px solid #efefef69;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
}

.delete-button,
.edit-button {
    position: absolute;
    top: 0.5em;
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

.delete-button {
    left: 0.5em;
    background-color: #eb4605;
    color: white;
}

.edit-button {
    right: 0.5em;
    background-color: #ffeb3b;
}

.delete-button:hover {
    background-color: #a33003;
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