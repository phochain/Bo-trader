import {create} from "zustand";

interface IUserState {
  userInfo: any,
  setUserInfo: (userInfo: any) => void
}
export const useUserInfo = create<IUserState>((set) => ({
  userInfo: null,
  setUserInfo: (userInfo) => set({userInfo})
}));
