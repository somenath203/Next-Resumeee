import { create } from 'zustand';


const userGlobalStore = create((set) => ({

    currentUserData: null,

    setCurrentUserData: (user) => set({ currentUserData: user })

}));


export default userGlobalStore;