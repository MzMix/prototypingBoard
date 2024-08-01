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
    <div class="import-input-container">
        <input type="file" @change="handleFileChange" accept=".json" class="file-input" />
    </div>
</template>


<style scoped>
.import-input-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
}

.file-input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
}
</style>