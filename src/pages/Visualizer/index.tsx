import React, { FC } from "react";
import { motion } from "framer-motion";
import { useRetrieveDataset } from "hooks/useRetrieveDataset";
import { BasicTable } from "components/Table";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { LayoutChartSection } from "./components/Layout";
import { BarChart } from "components/BarChart";
import { ScatterPlot } from "components/ScatterPlot";
import { ScalesSelector } from "./components/MultipleSelect";

export const VisualizerPage: FC = () => {
  const dataset = useRetrieveDataset();
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
          <BasicTable tableHeadValues={tableHeadValues} />
          <ScalesSelector />
          <LayoutChartSection>
            <BarChart />
          </LayoutChartSection>
          <LayoutChartSection>
            <ScatterPlot />
          </LayoutChartSection>
        </>
      )}
    </motion.div>
  );
};
