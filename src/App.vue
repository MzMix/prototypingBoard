<script setup>
import { Sortable } from '@shopify/draggable';
import { onMounted, ref } from 'vue';
import Card from './components/Card.vue';

const editMode = ref(false);

const colors = [
  'rgb(0,175,100)',
  'rgb(0,175,125)',
  'rgb(0,175,150)',
  'rgb(0,175,175)',
  'rgb(0,175,200)',
  'rgb(0,175,225)',
  'rgb(0,175,250)',
  'rgb(175,0,0)',
  'rgb(175,0,25)',
  'rgb(175,0,50)',
  'rgb(175,0,75)',
  'rgb(175,0,100)',
]

onMounted(() => {
  const sortable = new Sortable(
    document.querySelectorAll('[sortable]'), {
    draggable: '[sortItem]',
    delay: 0,
  });

  sortable.on('sortable:start', (sortableEvent) => {
    if (editMode.value) sortableEvent.cancel();
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

function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

</script>

<template>

  <div class="editModeSwitch">
    <label for="editMode">Edit Mode:</label>
    <input type="checkbox" id="editMode" v-model="editMode">
  </div>

  <div class="grid">

    <div class="groupWrapper">
      Sekcja 1
      <transition-group tag="div" name="sortableCards" sortable class="group">
        <Card v-for="num in 5" :key="'a' + num" sortItem class="item" :color=getRandomColor()
          :contents="(num).toString()">
        </Card>
      </transition-group>
    </div>

    <div class=" groupWrapper">
      Sekcja 2
      <transition-group tag="div" name="sortableCards" sortable class="group">
        <Card v-for=" num  in  5 " :key="'b' + num" sortItem class="item" :color=getRandomColor()
          :contents="(num + 5).toString()"></Card>
      </transition-group>
    </div>

    <div class="groupWrapper">
      Sekcja 3
      <transition-group tag="div" name="sortableCards" sortable class="group">
        <Card v-for="num in 5" :key="'c' + num" sortItem class="item" :color=getRandomColor()
          :contents="(num + 10).toString()"></Card>
      </transition-group>
    </div>

  </div>
</template>

<style scoped>
.item {
  border: 1px solid #efefef;
  padding: 1em;
  aspect-ratio: 1;
  width: 4em;
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
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1em;
  justify-content: center;
  align-items: center;
}
</style>
