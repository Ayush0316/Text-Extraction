import { createSlice } from "@reduxjs/toolkit";

export const docSlice = createSlice({
  name: "selectedDoc",
  initialState: {
    dataList: [],
    seletedDataRow: null,
  },
  reducers: {
    addData: (state, action) => {
      const data = action.payload;
      const newData = {
        title: data.title,
        value: data.value,
        keyData: data.keyMetadata,
        valueData: data.valueMetadata,
      };
      state.dataList.push(newData);
    },
    updateData: (state, action) => {
      const { index, updatedData } = action.payload;
      console.log(updatedData)
      state.dataList[index] = {
        ...state.dataList[index],
        ...updatedData,
      };
    },
    deleteData: (state, action) => {
      const { index } = action.payload;
      state.dataList = state.dataList.filter((ele, ind) => ind != index);
    },
    updateSelectedDataRow: (state, action) => {
      const index = action.payload;
      console.log(index)
      state.seletedDataRow = index;
    }
  },
});

// Action creators are generated for each case reducer function
export const DocActions = docSlice.actions;

export default docSlice.reducer;
