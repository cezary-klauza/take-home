import { create } from "zustand";
import { DeletedListItem, ListItem } from "./api/getListData";

type State = {
    cards: ListItem[],
    visibleCards: ListItem[];
    deletedCards: DeletedListItem[];
    isRevealed: boolean;
};

type Actions = {
    deleteCard: (id: number) => void;
    setVisibleCards: (cards: ListItem[]) => void;
    setCards: (cards: ListItem[]) => void;
    reveal: () => void;
    // revert: () => void;
};

export const useStore = create<State & Actions>((set) => ({
    cards: [],
    visibleCards: [],
    deletedCards: [],
    isRevealed: false,

    deleteCard: (id: number) => {
        set((state) => ({
            visibleCards: state.visibleCards.filter(item => item.id !== id),
            deletedCards: [...state.deletedCards, ...state.cards.filter(item => item.id === id)]
        }))
    },
    setCards: (cards: ListItem[]) => {
        set(() => ({
            cards: cards
        }))
    },
    setVisibleCards: (cards: ListItem[]) => {
        set(() => ({
            visibleCards: cards
        }));
    },
    reveal: () => {
        set((state) => ({
            isRevealed: !state.isRevealed
        }))
    }
}));
