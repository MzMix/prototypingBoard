<script setup>
import { Sortable } from '@shopify/draggable';
import { onMounted } from 'vue';

import { useDraggableStore } from './stores/draggableStore';
import { useCardStore } from './stores/cardStore';

import CardGroup from './components/CardGroup.vue';
import Card from './components/Card.vue';

import ExportButton from './components/ExportButton.vue';
import ImportInput from './components/ImportInput.vue';
import ClearButton from './components/ClearButton.vue';
import AddGroupButton from './components/AddGroupButton.vue';

const draggableStore = useDraggableStore();
const cardStore = useCardStore();

//Maybe use gzip to convert data for passing strings and we can pick either gzip or base64 based on the size of the data

onMounted(() => {

  const sortable = new Sortable(
    document.querySelectorAll('[sortable]'), {
    draggable: '[sortItem]',
    delay: 0,
  });

  sortable.on('sortable:start', (sortableEvent) => {
    if (!draggableStore.dragActive) sortableEvent.cancel();
  });

  sortable.on('sortable:stop', (sortableEvent) => {
    // Prevents firing when the card is dropped in the same group and position
    if (sortableEvent.oldContainer === sortableEvent.newContainer && sortableEvent.oldIndex === sortableEvent.newIndex) {
      return;
    }

    cardStore.moveCard(
      sortableEvent.data.dragEvent.data.originalSource.dataset.cardId,
      sortableEvent.data.newContainer.dataset.groupId,
      sortableEvent.data.newIndex
    );

  })
})

</script>

<template>
  <div class="background">

    <form class="inputs">
      <ExportButton />
      <ImportInput />
      <ClearButton />
      <AddGroupButton />
    </form>

    <div class="mainGrid">

      <CardGroup v-for="cardGroup in cardStore.cardGroups" :key="cardGroup.id" :data="cardGroup">
        <Card v-for="card in cardGroup.cards" :key="card.id" :data="card">
        </Card>
      </CardGroup>

    </div>

  </div>

</template>

<style scoped>
.background {
  min-height: 100vh;
  background-size: 50px 50px;
  background-image:
    linear-gradient(to right, grey 1px, transparent 1px),
    linear-gradient(to bottom, grey 1px, transparent 1px);
}

.inputs {
  display: flex;
  justify-content: space-around;
  gap: 1em;
  padding: 2em;
  border-bottom: 1px solid #ccc;
  background-color: #f8f9fa;
}

.mainGrid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: .5em;
}
</style>
