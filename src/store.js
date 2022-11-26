import create from 'zustand'

export const useStore = create((set) => ({
    username: null,
    roomId: null,
    setUsername: (username) => set(() => ({ username: username })),
    setRoomId: (roomId) => set(() => ({ roomId: roomId })),
}))