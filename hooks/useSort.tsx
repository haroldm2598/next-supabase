import { create } from 'zustand';

interface State {
	count: number;
	orderBy: string;
}

interface Action {
	inc: () => void;
	setOrderBy?: (orderBy: string) => void;
}

export const useStore = create<State & Action>()((set) => ({
	count: 1,
	orderBy: 'created_at',
	setOrderBy: (orderBy: string) => set(() => ({ orderBy })),
	inc: () => set((state) => ({ count: state.count + 1 }))
}));
