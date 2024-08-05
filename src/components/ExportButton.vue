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
    <button @click="exportStore" class="form-control btn btn-info">
        Pobierz <i class="bi bi-download"></i>
    </button>
</template>

<style scoped></style>