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
    <div>
        <button @click="clearStore" class="clear-button">
            Clear Store
        </button>
    </div>
</template>

<style scoped>
.clear-button {
    background-color: #dc3545;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 5px;
    font-size: 16px;
}

.clear-button:hover {
    background-color: #c82333;
}
</style>