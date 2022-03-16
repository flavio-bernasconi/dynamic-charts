import React, { memo, useEffect } from "react";
import * as d3 from "d3";
import { useSelector } from "react-redux";
import _ from "lodash";
import { CHART_DIMENSIONS } from "pages/Visualizer/constants";
import { useGetScales } from "hooks/useGetScales";

const ScatterPlotC = () => {
  const { xScale, yScale, colorScale } = useGetScales({ isScatterPlot: true });
  console.log("------ render ScatterPlotC");

  const dataset = useSelector((state) => state.dataset.original);

  const xScaleKey = useSelector((state) => state.dataset.xScaleKey);
  const yScaleKey = useSelector((state) => state.dataset.yScaleKey);

  const svgRef = React.useRef(null);

  const { height, svgWidth, svgHeight, margin } = CHART_DIMENSIONS;

  useEffect(() => {
    if (!svgRef.current) return;

    const chart = d3.select(svgRef.current);
    chart.selectAll("g").remove();

    chart
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(xScale));

    chart.append("g").call(d3.axisLeft(yScale));
  }, [svgRef, yScale, xScale]);

  return (
    <svg width={svgWidth} height={svgHeight}>
      <g ref={svgRef} transform={`translate(${margin.left},${margin.top})`}>
        {dataset.map((d, i) => {
          const xVal = d[xScaleKey];
          const yVal = d[yScaleKey];
          if (!xVal) return;
          const fill = colorScale(xVal.toString());

          return (
            <circle
              cx={xScale(xVal.toString())}
              cy={yScale(yVal)}
              r="5"
              style={{ opacity: 0.8 }}
              fill={fill}
              stroke="black"
              key={i}
            />
          );
        })}
      </g>
    </svg>
  );
};

export const ScatterPlot = memo(ScatterPlotC);
