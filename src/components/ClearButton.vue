<script setup>
import { ref } from 'vue';
import { useCardStore } from '../stores/cardStore';

const cardStore = useCardStore();

const clearStore = () => {
    if (window.confirm('Are you sure you want to clear the store?')) {
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