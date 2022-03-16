import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import {
  setXScaleKey,
  setYScaleKey,
  setColorScaleKey,
} from "store/datasetStore";
import { MultipleSelects } from "components/MultipleSelect";

export interface OptionsListConfigInterface {
  setter: Function;
  label: string;
  value: string | undefined;
}

export const ScalesSelector = () => {
  const dispatch = useDispatch();

  const xScaleKey = useSelector((state: RootState) => state.dataset.xScaleKey);
  const yScaleKey = useSelector((state: RootState) => state.dataset.yScaleKey);
  const colorScaleKey = useSelector(
    (state: RootState) => state.dataset.colorScaleKey
  );

  const optionListConfig: OptionsListConfigInterface[] = [
    {
      setter: (value: string) => dispatch(setXScaleKey(value)),
      label: "xxxx",
      value: xScaleKey,
    },
    {
      setter: (value: string) => dispatch(setYScaleKey(value)),
      label: "yyyy",
      value: yScaleKey,
    },
    {
      setter: (value: string) => dispatch(setColorScaleKey(value)),
      label: "color",
      value: colorScaleKey,
    },
  ];

  const tableHeadValues = useSelector(
    (state: RootState) => state.dataset.csvKeys
  );

  return (
    <MultipleSelects
      optionsList={tableHeadValues}
      optionListConfig={optionListConfig}
    />
  );
};
