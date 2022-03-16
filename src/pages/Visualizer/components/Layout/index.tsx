import React, { FC } from "react";
import { useRetrieveDataset } from "hooks/useRetrieveDataset";
import { useGetScales } from "hooks/useGetScales";

export const LayoutChartSection: FC = ({ children }) => {
  const dataset = useRetrieveDataset();

  const { isLoading } = useGetScales();

  return (
    <div>
      {dataset.length > 0 && (
        <>
          {isLoading && <p>select scales</p>}
          {!isLoading && (
            <div
              style={{
                margin: "auto",
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              {children}
            </div>
          )}
        </>
      )}
    </div>
  );
};
