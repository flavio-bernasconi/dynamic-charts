import React, { useMemo } from "react";
import * as d3 from "d3";
import _ from "lodash";
import { formatDataset, getUniqueDataset } from "utils/dataset";
import chroma from "chroma-js";
import { useSelector } from "react-redux";

export const useGetScales = ({ width, height }) => {
  // "sepal.length","sepal.width","petal.length","petal.width","variety"
  const dataset = useSelector((state) => state.dataset.original);

  const xScaleKey = useSelector((state) => state.dataset.xScaleKey);
  const yScaleKey = useSelector((state) => state.dataset.yScaleKey);
  const colorScaleKey = useSelector((state) => state.dataset.colorScaleKey);

  const xDataset = useMemo(() => formatDataset({ dataset, key: xScaleKey }), [
    xScaleKey,
  ]);
  const yDataset = formatDataset({ dataset, key: yScaleKey });
  const colorDataset = formatDataset({ dataset, key: colorScaleKey });

  const uniqueColorDataset = getUniqueDataset(colorDataset);

  const listOfColors = chroma
    .scale(["#fafa6e", "#2A4858"])
    .mode("lch")
    .colors(uniqueColorDataset.length);

  const colorScale = useMemo(
    () => d3.scaleOrdinal().domain(uniqueColorDataset).range(listOfColors),
    [uniqueColorDataset, listOfColors]
  );

  const xScale = useMemo(
    () =>
      d3
        .scaleLinear()
        .domain([0, Math.max(...xDataset)])
        .range([0, width])
        .nice(),
    [xDataset]
  );

  const xScaleBand = useMemo(
    () =>
      d3
        .scaleBand()
        .domain(getUniqueDataset(xDataset))
        .range([0, width])
        .paddingOuter(0.25)
        .paddingInner(0.5),
    [xDataset]
  );

  const yScale = useMemo(
    () =>
      d3
        .scaleLinear()
        .domain([0, Math.max(...yDataset)])
        .range([height, 0])
        .nice(),
    [yDataset]
  );

  const yScaleBand = useMemo(
    () =>
      d3
        .scaleBand()
        .domain(getUniqueDataset(yDataset))
        .range([0, height])
        .paddingOuter(0.25)
        .paddingInner(0.5),
    [xDataset]
  );

  const xScaleByType = {
    number: xScale,
    string: xScaleBand,
  };

  const xScaleToUse = useMemo(() => xScaleByType[typeof xDataset[0]], [
    xDataset,
  ]);

  const yScaleByType = {
    number: yScale,
    string: yScaleBand,
  };

  const yScaleToUse = useMemo(() => yScaleByType[typeof yDataset[0]], [
    yDataset,
  ]);

  if (!xScaleKey || !yScaleKey) return { isLoading: true };

  return {
    xScale: xScaleToUse,
    yScale: yScaleToUse,
    colorScale,
    isLoading: !xScaleToUse && !yScaleToUse && !colorScale,
  };
};
