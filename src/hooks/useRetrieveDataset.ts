import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { setDataset, setCsvKeys } from "store/datasetStore";

export const useRetrieveDataset = () => {
  const dataset = useSelector((state: RootState) => state.dataset.original);
  const dispatch = useDispatch();

  const retrievedDataset: string = localStorage.getItem("dataset") || '"[]"';
  const parseRetrievedDataset = JSON.parse(retrievedDataset);

  useEffect(() => {
    if (dataset.length > 0 || parseRetrievedDataset.length === 0) return;
    console.log("----- useRetrieveDataset -------", {
      retrievedDataset,
      parseRetrievedDataset,
    });

    dispatch(setDataset(parseRetrievedDataset));
    dispatch(setCsvKeys(Object.keys(parseRetrievedDataset[0])));
  }, [dataset, parseRetrievedDataset]);

  return dataset || {};
};
