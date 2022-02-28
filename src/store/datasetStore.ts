import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface unknownArrayOfObjects {
  [key: string]: string | number;
}

export interface ChartsStateInterface {
  original: unknown[];
  csvKeys: string[];
  xScaleKey: string | undefined;
  yScaleKey: string | undefined;
  colorScaleKey: string | undefined;
}

const initialState: ChartsStateInterface = {
  original: [],
  csvKeys: [],
  xScaleKey: undefined,
  yScaleKey: undefined,
  colorScaleKey: undefined,
};

export const datasetSlice = createSlice({
  name: "dataset",
  initialState,
  reducers: {
    setDataset: (
      state,
      action: PayloadAction<ChartsStateInterface["original"]>
    ) => {
      state.original = action.payload;
    },
    setCsvKeys: (
      state,
      action: PayloadAction<ChartsStateInterface["csvKeys"]>
    ) => {
      state.csvKeys = action.payload;
    },
    setXScaleKey: (
      state,
      action: PayloadAction<ChartsStateInterface["xScaleKey"]>
    ) => {
      state.xScaleKey = action.payload;
    },
    setYScaleKey: (
      state,
      action: PayloadAction<ChartsStateInterface["yScaleKey"]>
    ) => {
      state.yScaleKey = action.payload;
    },
    setColorScaleKey: (
      state,
      action: PayloadAction<ChartsStateInterface["colorScaleKey"]>
    ) => {
      state.colorScaleKey = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setDataset,
  setCsvKeys,
  setXScaleKey,
  setYScaleKey,
  setColorScaleKey,
} = datasetSlice.actions;

export default datasetSlice.reducer;
