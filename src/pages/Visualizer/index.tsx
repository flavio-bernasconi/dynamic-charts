import React, { FC } from "react";
import { motion } from "framer-motion";
import { useRetrieveDataset } from "hooks/useRetrieveDataset";
import { BasicTable } from "components/Table";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { BarChartSection } from "./components/BarChartSection";
import { ScatterPlotChartSection } from "./components/ScatterPlotChartSection";

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

export const VisualizerPage: FC = () => {
  useRetrieveDataset();

  const dataset = useSelector((state: RootState) => state.dataset.original);
  const tableHeadValues = useSelector(
    (state: RootState) => state.dataset.csvKeys
  );

  return (
    <motion.div
      style={{
        background: "white",
        // display: "flex",
      }}
      initial={{ scale: 1 }}
      animate={{ scale: 1 }}
      exit={{ scale: [0.8, 9] }}
      transition={{
        delay: 0.5,
        duration: 1,
        times: [0.4, 1],
        ease: [0.17, 0.67, 0.83, 0.67],
      }}
    >
      {dataset.length > 0 && (
        <>
          <BasicTable dataset={dataset} tableHeadValues={tableHeadValues} />
          <BarChartSection />
          <ScatterPlotChartSection />
        </>
      )}
    </motion.div>
  );
};
