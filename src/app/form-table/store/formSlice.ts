import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormData } from "./types";

interface FormState {
  data: FormData[];
}

const initialState: FormState = {
  data: [],
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    addData: (state, action: PayloadAction<FormData>) => {
      state.data.push(action.payload);
    },

    editData: (state, action: PayloadAction<FormData>) => {
      const index = state.data.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.data[index] = action.payload;
      }
    },

    deleteData: (state, action: PayloadAction<number>) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
    },

    setData: (state, action: PayloadAction<FormData[]>) => {
      state.data = action.payload;
    },
  },
});

export const { addData, editData, deleteData, setData } = formSlice.actions;

export default formSlice.reducer;
