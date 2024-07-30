<script setup>
import { ref } from 'vue';
import Modal from './Modal.vue';

const props = defineProps({
    color: {
        type: String,
        default: "rgb(70,175,100)"
    },
    contents: {
        type: String,
        default: "Lorem"
    }
});

const contents = ref(props.contents);
const color = ref(props.color);
const isModalVisible = ref(false);

const openModal = () => {
    isModalVisible.value = true;
};

const closeModal = () => {
    isModalVisible.value = false;
};

const saveChanges = (data) => {
    contents.value = data.contents;
    color.value = data.color;
    closeModal();
};

</script>

<template>
    <div sortItem class="item" :style="{ backgroundColor: color }">
        <button @click="openModal">Edit</button>
        {{ contents }}

        <Modal :visible="isModalVisible" :contents="contents" :color="color" @close="closeModal" @save="saveChanges" />
    </div>

</template>

<style scoped>
button {
    width: 100%;
    margin-bottom: .5em;
}

.item {
    border: 1px solid #efefef;
    padding: 1em;
    aspect-ratio: 1;
    width: 4em;
    border-radius: 1em;
}
</style>