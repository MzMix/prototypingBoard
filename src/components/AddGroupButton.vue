<script setup>
import { useCardStore } from '../stores/cardStore';

const cardStore = useCardStore();

const addGroup = () => {
    cardStore.addGroup();
};
</script>

<template>
    <button @click="addGroup" class="add-group-button">
        Add New Group
    </button>
</template>

<style scoped>
.add-group-button {
    background-color: #338ef0;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 5px;
    font-size: 16px;
}

.add-group-button:hover {
    background-color: #5ca2ec;
}
</style>