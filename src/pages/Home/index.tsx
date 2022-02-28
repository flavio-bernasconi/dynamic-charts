import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

import { Upload } from "./components/Upload";
import { Wrapper } from "./styles";
import { mainColor } from "./constants";
import { useNavigate } from "react-router-dom";
import { routes } from "routes";
import { useDispatch } from "react-redux";
import Papa from "papaparse";
import { setDataset } from "store/datasetStore";
import { useRetrieveDataset } from "hooks/useRetrieveDataset";

// import { routes } from "../../routes";

export const Home = () => {
  const [isReady, setIsReady] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useRetrieveDataset();

  const onUploadFinished = () => navigate(routes.visualizer);

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file: File = e.target.files![0];
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: (result): void => {
          dispatch(setDataset(result.data));
          localStorage.setItem("dataset", JSON.stringify(result.data));
          setIsReady(true);
        },
      });
    }
  };

  return (
    <Wrapper color={mainColor}>
      {/* <Upload color={mainColor} onUploadFinished={onUploadFinished} /> */}
      <input
        style={{ position: "relative", zIndex: 98 }}
        onChange={handleFileSelected}
        type="file"
        accept=".csv"
      />
      <button onClick={onUploadFinished}>upload</button>
      <button
        onClick={() => {
          dispatch(setDataset([]));
          localStorage.setItem("dataset", JSON.stringify([]));
        }}
      >
        CLEAN
      </button>
    </Wrapper>
  );
};
