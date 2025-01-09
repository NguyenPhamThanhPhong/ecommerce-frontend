import { create } from 'zustand';

export const useSnackbarStore = create((set) => ({
  messages: [],
  pub: (message, status) =>
    set((state) => ({
      messages: [...state.messages, { id: Date.now(), message, status }],
    })),
  sub: () =>
    set((state) => {
      const [current, ...rest] = state.messages;
      return { messages: rest, current };
    }),
  consume: () =>
    set((state) => ({
      messages: state.messages.slice(1),
    })),
}));
