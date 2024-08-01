import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core';
import { ref } from 'vue';

export class Card {
    id = '';
    color = '';
    content = '';
    position = 0;
}

export class CardGroup {
    id = '';
    name = '';
    color = '';
    cards = [];
}

export const useCardStore = defineStore('cards', () => {

    const cardGroups = ref(useLocalStorage('cardGroups', [
        {
            id: '1',
            name: 'To Do',
            cards: [
                {
                    id: '1',
                    color: '#007bff',
                    content: 'Card 1'
                },
                {
                    id: '2',
                    color: '#6c757d',
                    content: 'Card 2'
                },
                {
                    id: '3',
                    color: '#28a745',
                    content: 'Card 3'
                }
            ]
        },
        {
            id: '2',
            name: 'In Progress',
            cards: [
                {
                    id: '4',
                    color: '#dc3545',
                    content: 'Card 4'
                },
                {
                    id: '5',
                    color: '#ffc107',
                    content: 'Card 5'
                }
            ]
        },
        {
            id: '3',
            name: 'Done',
            cards: [
                {
                    id: '6',
                    color: '#17a2b8',
                    content: 'Card 6'
                }
            ]
        }
    ]));

    function moveCard(cardId, toGroupId) {
        //Move card from its group to the new group
        const fromGroup = this.cardGroups.find(group => group.cards.find(card => card.id === cardId));
        const toGroup = this.cardGroups.find(group => group.id === toGroupId);
        const card = fromGroup.cards.find(card => card.id === cardId);

        //Remove card from the old group
        fromGroup.cards = fromGroup.cards.filter(card => card.id !== cardId);

        //Add card to the new group
        toGroup.cards.push(card);
    }

    function resetStore() {
        cardGroups.value = [];
    }

    return {
        cardGroups,

        moveCard,
        resetStore
    }
}
)