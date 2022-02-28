import React, { FC } from "react";
import { motion } from "framer-motion";
import { useRetrieveDataset } from "hooks/useRetrieveDataset";
import { BasicTable } from "components/Table";
import { BarChart as ScatterPlot } from "components/BarChart";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { MultipleSelects } from "../MultipleSelect";
import { useGetScales } from "hooks/useGetScales";
import {
  setXScaleKey,
  setYScaleKey,
  setColorScaleKey,
} from "store/datasetStore";

const dimensions = {
  width: 900,
  height: 700,
  margin: {
    top: 50,
    bottom: 20,
    left: 50,
    right: 20,
  },
};

export interface OptionsListConfigInterface {
  setter: Function;
  label: string;
  value: string | undefined;
}

export const ScatterPlotChartSection: FC = () => {
  useRetrieveDataset();
  const dispatch = useDispatch();

  const dataset = useSelector((state: RootState) => state.dataset.original);

  const xScaleKey = useSelector((state: RootState) => state.dataset.xScaleKey);
  const yScaleKey = useSelector((state: RootState) => state.dataset.yScaleKey);
  const colorScaleKey = useSelector(
    (state: RootState) => state.dataset.colorScaleKey
  );

  const { isLoading, xScale, yScale, colorScale } = useGetScales({
    width: dimensions.width,
    height: dimensions.height,
  });

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
    <div>
      {dataset.length > 0 && (
        <>
          <MultipleSelects
            optionsList={tableHeadValues}
            optionListConfig={optionListConfig}
          />
          {isLoading && <p>loading ...</p>}
          {!isLoading && (
            <div
              style={{
                margin: "auto",
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <ScatterPlot
                dimensions={dimensions}
                scales={{ xScale, yScale, colorScale }}
                useBars={true}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};
