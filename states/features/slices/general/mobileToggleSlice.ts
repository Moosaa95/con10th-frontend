import { RootState } from "@/states/store";
import {createSlice, PayloadAction} from "@reduxjs/toolkit"

interface MobileToggleState {
    isOpen: boolean;
}

const initialState: MobileToggleState = {
    isOpen: false 
}

const mobileToggleSlice = createSlice({
    name: "mobileToggle",
    initialState,
    reducers: {
        openModal: (state) => {
            state.isOpen = true;
        },
        closeModal: (state) => {
            state.isOpen = false;
        }
    }
})


export const {openModal, closeModal} = mobileToggleSlice.actions
export default mobileToggleSlice.reducer;

// export const selectIsModalOpen = (state: RootState) => state.generalModal.isOpen;