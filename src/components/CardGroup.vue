<script setup>
import { ref } from 'vue';
import { useCardStore } from '../stores/cardStore';

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
const cardStore = useCardStore();

function addCard() {
    cardStore.addCard(props.data.id);
}

</script>

<template>
    <div class="groupWrapper">
        <h3>{{ name }}</h3>
        <transition-group tag="div" name="sortableCards" sortable class="group" :data-group-id="data.id">
            <slot />
        </transition-group>

        <button @click="addCard"><i class="bi bi-plus"></i></button>
    </div>
</template>

<style scoped>
.groupWrapper {
    margin: 2em;
    --primary-color: #dde024b0;
}

h3 {
    width: 75%;
    margin: 0 auto 0 auto;
    padding: .2em 0 .2em 0;
    border: 2px solid var(--primary-color);
    border-bottom: none;
    border-radius: 0.5em 0.5em 0 0;
}

.group {
    padding: 1em;
    border: 2px solid var(--primary-color);
    border-radius: 0.5em;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    gap: 1em;
}

button {
    position: relative;
    top: -3.5em;
    right: -10.5em;

    background-color: var(--primary-color);
    border: none;
    border-radius: 50%;
    width: 3em;
    height: 3em;
}
</style>