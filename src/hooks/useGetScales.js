import React, { useMemo } from "react";
import * as d3 from "d3";
import _ from "lodash";
import { formatDataset, getUniqueDataset } from "utils/dataset";
import chroma from "chroma-js";
import { useSelector } from "react-redux";
import { CHART_DIMENSIONS } from "pages/Visualizer/constants";

export const useGetScales = (props = {}) => {
  console.log({ props });
  const { isScatterPlot } = props;

  const width = CHART_DIMENSIONS.width;
  const height = CHART_DIMENSIONS.height;

  // "sepal.length","sepal.width","petal.length","petal.width","variety"
  const dataset = useSelector((state) => state.dataset.original);

  const xScaleKey = useSelector((state) => state.dataset.xScaleKey);
  const yScaleKey = useSelector((state) => state.dataset.yScaleKey);
  const colorScaleKey = useSelector((state) => state.dataset.colorScaleKey);

  const xDataset = useMemo(() => formatDataset({ dataset, key: xScaleKey }), [
    xScaleKey,
  ]);
  const yDataset = useMemo(() => formatDataset({ dataset, key: yScaleKey }), [
    yScaleKey,
  ]);
  const colorDataset = useMemo(
    () => formatDataset({ dataset, key: colorScaleKey }),
    [colorScaleKey]
  );

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

  const xScalePoint = useMemo(
    () =>
      d3
        .scaleBand()
        .domain(getUniqueDataset(xDataset))
        .range([0, width])
        .padding(0.5),
    [xDataset]
  );

  const xScaleByType = {
    number: xScale,
    string: isScatterPlot ? xScalePoint : xScaleBand,
  };

  const xScaleToUse = useMemo(() => xScaleByType[typeof xDataset[0]], [
    xDataset,
  ]);

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
    [yDataset]
  );

  const yScalePoint = useMemo(
    () =>
      d3
        .scalePoint()
        .domain(getUniqueDataset(yDataset))
        .range([0, height])
        .padding(0.5),
    [yDataset]
  );

  const yScaleByType = {
    number: yScale,
    string: isScatterPlot ? yScalePoint : yScaleBand,
  };

  const yScaleToUse = useMemo(() => yScaleByType[typeof yDataset[0]], [
    yDataset,
  ]);

  if (!xScaleKey || !yScaleKey || !xScaleToUse || !yScaleToUse || !colorScale)
    return { isLoading: true };

  return {
    xScale: xScaleToUse,
    yScale: yScaleToUse,
    colorScale,
    isLoading: !xScaleToUse && !yScaleToUse && !colorScale,
  };
};
