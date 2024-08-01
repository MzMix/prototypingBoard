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
    // if (sortableEvent.oldContainer === sortableEvent.newContainer && sortableEvent.oldIndex === sortableEvent.newIndex) {
    //   return;
    // }


    cardStore.moveCard(
      sortableEvent.data.dragEvent.data.originalSource.dataset.cardId,
      sortableEvent.data.newContainer.dataset.groupId,
      sortableEvent.data.newIndex
    );

    // try {
    //   cardStore.moveCard({
    //     cardId: sortableEvent.data.dragEvent.data.originalSource.dataset.cardId,
    //     fromGroupId: sortableEvent.data.oldContainer.dataset.groupId,
    //     toGroupId: sortableEvent.data.newContainer.dataset.groupId,
    //   });
    // } catch {
    //   console.log('Error moving card');
    // }

  })
})

</script>

<template>
  <div>

    <div class="inputs">
      <ExportButton />
      <ImportInput />
      <ClearButton />
      <AddGroupButton />
    </div>

    <div class="grid">

      <CardGroup v-for="cardGroup in cardStore.cardGroups" :key="cardGroup.id" :data="cardGroup">
        <Card v-for="card in cardGroup.cards" :key="card.id" :data="card">
        </Card>
      </CardGroup>

    </div>
  </div>


</template>

<style scoped>
.inputs {
  display: flex;
  justify-content: space-around;
  margin: 2em;
  padding-bottom: 1em;
  border-bottom: 1px solid #ccc;
}

.groupWrapper {
  text-align: center;
  margin: 2em;
}

.group {
  padding: 1em;
  border: 2px solid #dde024b0;
  border-radius: 0.5em;
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
  justify-content: space-around;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: .5em;
}
</style>
