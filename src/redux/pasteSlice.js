import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';
const initialState = {
  pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : []
}
export const pasteSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    AddToPastes: (state, action) => {
      const paste = action.payload;
      //add a check Paste already exist wala case 
      const exists = state.pastes.find(p => p.title === paste.title);
      if (exists) {
        toast.error("Paste with this title already exists!");
        return;
      }
      state.pastes.push(paste);
      localStorage.setItem("pastes", JSON.stringify
        (state.pastes));
      toast.success("Paste Created Successfully")
    },

    UpadteToPastes: (state, action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item) =>
        item._id === paste._id);
      if (index >= 0) {
        state.pastes[index] = paste;
        localStorage.setItem("pastes", JSON.stringify
          (state.pastes));
        toast.success("Paste updated");
      }
    },

    ResetAllPastes: (state, action) => {
      state.pastes = [];
      localStorage.removeItem("pastes")
    },
    RemoveAllPastes: (state, action) => {
      const pasteId = action.payload;
      console.log(pasteId);
      const index = state.pastes.findIndex((item) =>
        item._id === pasteId)
      if (index >= 0) {
        state.pastes.splice(index, 1);
        localStorage.setItem("pastes", JSON.stringify
          (state.pastes));

        toast.success("Paste Deleted")
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { AddToPastes, UpadteToPastes,
  ResetAllPastes, RemoveAllPastes } = pasteSlice.actions

export default pasteSlice.reducer