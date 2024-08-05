<script setup>
import { useCardStore } from '../stores/cardStore';

const cardStore = useCardStore();

const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const json = JSON.parse(e.target.result);
                cardStore.$patch(json);
            } catch (error) {
                console.error('Error parsing JSON:', error);
            }
        };
        reader.readAsText(file);
    }
};
</script>

<template>
    <input type="file" @change="handleFileChange" accept=".json" class="form-control" />
</template>

<style scoped></style>