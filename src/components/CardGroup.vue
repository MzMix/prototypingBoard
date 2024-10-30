<script setup>
import { ref } from 'vue';
import { useCardStore } from '../stores/cardStore';
import { getFontColorForBackfround } from '../utils/utils';
import Modal from './Modal.vue';

const props = defineProps({
    data: {
        type: Object,
        required: true,
        default: {
            id: -1,
            name: "Group",
            color: "#ffeb3b",//TODO use later
            cards: []
        }
    },
});

const name = ref(props.data.name);
const color = ref(props.data.color);
const cardStore = useCardStore();
const isModalVisible = ref(false);

function addCard() {
    cardStore.addCard(props.data.id);
}

const getFontColor = () => getFontColorForBackfround(color.value);

const floatToHex = (float) => {
    const hex = Math.round(float * 255).toString(16);
    return hex.padStart(2, '0');
};

const getBackgroundColorWithAddedOpacity = (opacityValue) => {
    const opacityHex = floatToHex(opacityValue);

    console.log(color.value + opacityHex);
    return color.value + opacityHex;
}

const openModal = () => {
    isModalVisible.value = true;
};

const closeModal = () => {
    isModalVisible.value = false;
};

const saveData = () => {
    cardStore.updateGroup(props.data.id, name.value, color.value);
    closeModal();
}

const deleteAllCards = () => {
    let response = confirm("Czy na pewno chcesz usunąć grupę?");
    if (!response) return;
    cardStore.deleteGroup(props.data.id);
    // cardStore.deleteAllCards(props.data.id);
};

</script>

<template>
    <div class="groupWrapper">
        <h3 :style="{ backgroundColor: color, color: getFontColor() }">{{ name }}</h3>
        <div class="group" :data-group-id="data.id">

            <transition-group tag="div" name="sortableCards" sortable class="cards" :data-group-id="data.id"
                :style="{ backgroundColor: getBackgroundColorWithAddedOpacity(0.3) }">
                <slot />
            </transition-group>

            <div key="ButtonGroup" class="ButtonGroup" :style="{ backgroundColor: color }">
                <button @click="deleteAllCards" class="DeleteAllButton"><i class="bi bi-trash"></i></button>
                <button @click="openModal" class="EditGroupButton"><i class="bi bi-pencil"></i></button>
                <button @click="addCard" class="AddButton"><i class="bi bi-plus"></i></button>
            </div>

        </div>

        <Modal :visible="isModalVisible" @close="closeModal" @save="saveData">
            <h3 class="text-black">Edytuj</h3>

            <label for="name">Nazwa:</label>
            <input type="text" class="form-control" id="name" v-model="name" />

            <label for="color">Kolor:</label>
            <input id="color" type="color" class="form-control m-auto mb-4" v-model="color" />

        </Modal>
    </div>
</template>

<style scoped>
.groupWrapper {
    margin: 2em;
    text-align: center;
}

h3 {
    width: 75%;
    margin: 0 auto 0 auto;
    padding: .2em 0 .2em 0;

    border-bottom: 1px solid #4b44445e;
    border-radius: 0.5em 0.5em 0 0;
}

.group {
    display: flex;
    flex-direction: column;

    border-radius: 0.5em;
}

.cards {
    min-height: 10em;
    padding: 2em;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    gap: 1em;
    border-radius: 0.25em 0.25em 0 0;
}

.ButtonGroup {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1em;

    border-top: 1px solid #4b44445e;
    border-radius: 0 0 0.25em 0.25em;
}

button {
    width: 3em;
    height: 3em;

    border: none;
    border-radius: 50%;
}

.EditGroupButton {
    background-color: #e978ffe7;
    color: white;
}

.DeleteAllButton {
    background-color: #eb4605b0;
    color: white;
}

.AddButton {
    background-color: #82e90eb0;
}
</style>