<script setup>
import { useCardStore } from '../stores/cardStore';

const cardStore = useCardStore();

const addGroup = () => {
    cardStore.addGroup();
};
</script>

<template>
    <button @click="addGroup" class="form-control btn btn-primary">
        Dodaj grupę <i class="bi bi-plus"></i>
    </button>
</template>

<style scoped></style>