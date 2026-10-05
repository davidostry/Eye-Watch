import { create } from "zustand";
import type { Alert } from "../api/api";

type State = {

alert: Alert | null;


setAlert: (alert:Alert) => void;


};

const useStore = create<State>((set) => ({

alert: null,


setAlert: (alert) => {
    set({
        alert
    });
}


}));

export default useStore;
