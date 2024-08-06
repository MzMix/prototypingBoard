<script setup>
import { ref } from 'vue';
import { useCardStore } from '../stores/cardStore';

const cardStore = useCardStore();

const clearStore = () => {
    if (window.confirm('Czy na pewno chcesz usunąć wszystkie dane?')) {
        cardStore.resetStore();
    }
};
</script>

<template>
    <button @click="clearStore" class="form-control btn btn-danger">
        Usuń dane <i class="bi bi-trash"></i>
    </button>
</template>

<style scoped></style>