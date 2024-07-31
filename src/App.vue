<script setup>
import { Sortable } from '@shopify/draggable';
import { onMounted } from 'vue';
import { useDraggableStore } from './stores/draggableStore';
import Card from './components/Card.vue';

const draggableStore = useDraggableStore();

const colors = [
  '#00af64',
  '#00af7d',
  '#00af96',
  '#00afaf',
  '#00afc8',
  '#00afe1',
  '#00affa',
  '#af0000',
  '#af0019',
  '#af0032',
  '#af004b',
  '#af0064',
]

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

    if (sortableEvent.oldContainer === sortableEvent.newContainer) {
      return;
    }

    console.log("From: ")
    console.log(sortableEvent.oldContainer)

    console.log("To: ")
    console.log(sortableEvent.newContainer)
  })
})

const getRandomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
}

</script>

<template>
  <div class="grid">

    <div class="groupWrapper">
      Sekcja 1
      <transition-group tag="div" name="sortableCards" sortable class="group">
        <Card v-for="num in 5" :key="'a' + num" sortItem :color=getRandomColor() :contents="(num).toString()">
        </Card>
      </transition-group>
    </div>

    <div class=" groupWrapper">
      Sekcja 2
      <transition-group tag="div" name="sortableCards" sortable class="group">
        <Card v-for=" num  in  5 " :key="'b' + num" sortItem :color=getRandomColor() :contents="(num + 5).toString()">
        </Card>
      </transition-group>
    </div>

    <div class="groupWrapper">
      Sekcja 3
      <transition-group tag="div" name="sortableCards" sortable class="group">
        <Card v-for="num in 5" :key="'c' + num" sortItem :color=getRandomColor() :contents="(num + 10).toString()">
        </Card>
      </transition-group>
    </div>

  </div>
</template>

<style scoped>
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
