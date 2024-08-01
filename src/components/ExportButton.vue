<script setup>
import { useCardStore } from '../stores/cardStore';
import { saveAs } from 'file-saver';

const cardStore = useCardStore();

const exportStore = () => {
    const state = cardStore.$state;
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    saveAs(blob, 'store-export.json');
};
</script>

<template>
    <button @click="exportStore" class="export-button">
        Export Store
    </button>
</template>

<style scoped>
.export-button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 5px;
    font-size: 16px;
}

.export-button:hover {
    background-color: #0056b3;
}
</style>