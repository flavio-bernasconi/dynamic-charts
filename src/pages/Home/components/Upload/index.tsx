import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import {
  Wrapper,
  CircleAnimated,
  LoadCircle,
  LoadCircleWrapper,
} from "./styles";
import { motion } from "framer-motion";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../../routes";
import { setDataset } from "store/datasetStore";
import Papa from "papaparse";

interface Props {
  color: string;
  onUploadFinished: Function;
}

let interval: ReturnType<typeof setInterval>;

const InputFile = ({ onUploadFinished }: { onUploadFinished: Function }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [progress, setProgress] = useState(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isRunning) {
      interval = setInterval(() => {
        setProgress((prev) => prev + 1);
      }, 15);
    } else {
      clearInterval(interval);
    }
  }, [isRunning]);

  useEffect(() => {
    if (progress === 100) {
      setIsRunning(false);
      clearInterval(interval);
    }
  }, [progress, navigate]);

  useEffect(() => {
    if (isReady && !isRunning) {
      onUploadFinished();
    }
  }, [isReady, isRunning]);

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file: File = e.target.files![0];
    setIsRunning(true);
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
    <>
      <LoadCircleWrapper>
        <LoadCircle
          className="percent"
          cx="200"
          cy="200"
          r="200"
          pathLength="100"
          progress={progress}
        />
      </LoadCircleWrapper>
      <input
        style={{ position: "relative", zIndex: 98 }}
        onChange={handleFileSelected}
        type="file"
        accept=".csv"
      />
    </>
  );
};

export const Upload = ({ color, onUploadFinished }: Props): JSX.Element => {
  return (
    <Wrapper>
      <InputFile onUploadFinished={onUploadFinished} />
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: 1 }}
        exit={{ scale: [0.8, 9] }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          times: [0.4, 1],
          ease: [0.17, 0.67, 0.83, 0.67],
        }}
        className="circle"
        style={{ background: color }}
      />
      {[0, 0, 0, 0, 0].map((_, i) => (
        <CircleAnimated index={i} color={color} />
      ))}
    </Wrapper>
  );
};
