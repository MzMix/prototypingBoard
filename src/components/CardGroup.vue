<script setup>
import { ref } from 'vue';
import { useCardStore } from '../stores/cardStore';
import { getFontColorForBackfround } from '../utils/utils';

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

function addCard() {
    cardStore.addCard(props.data.id);
}

function getFontColor() { return getFontColorForBackfround(color.value); }

</script>

<template>
    <div class="groupWrapper">
        <h3 :style="{ backgroundColor: color, color: getFontColor() }">{{ name }}</h3>
        <div class="group" :style="{ backgroundColor: color }" :data-group-id="data.id">

            <transition-group tag="div" name="sortableCards" sortable class="cards" :style="{ backgroundColor: color }"
                :data-group-id="data.id">
                <slot />
            </transition-group>

            <div key="ButtonGroup" class="ButtonGroup">
                <button @click="deleteAllCards" class="DeleteAllButton"><i class="bi bi-trash"></i></button>
                <button @click="editGroup" class="EditGroupButton"><i class="bi bi-pencil"></i></button>
                <button @click="addCard" class="AddButton"><i class="bi bi-plus"></i></button>
            </div>

        </div>
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
}

.ButtonGroup {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1em;

    border-top: 1px solid #4b44445e;
    border-radius: .25em;
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