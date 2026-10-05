import { create } from "zustand";
import type { Alert } from "../api/api";

type AuthState = {

alert: Alert | null;


setAlert: (alert:Alert) => void;


};

const useAuthStore = create<AuthState>((set) => ({

alert: null,


setAlert: (alert) => {
    set({
        alert
    });
}


}));

export default useAuthStore;
