import { defineStore } from 'pinia'

export const useDraggableStore = defineStore('draggable', {

    state: () => ({
        dragActive: true,
    }),
    actions: {
        toggleDraggable() {
            this.dragActive = !this.dragActive;
        },
        setDraggable(value) {
            this.dragActive = value;
        }
    }

})