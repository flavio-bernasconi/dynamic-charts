import React, { memo, useEffect } from "react";
import * as d3 from "d3";
import { useSelector } from "react-redux";
import _ from "lodash";

const BarChartC = ({ dimensions, scales, useBars }) => {
  const { xScale, yScale, colorScale } = scales;
  console.log("------ render chart");

  const dataset = useSelector((state) => state.dataset.original);

  const xScaleKey = useSelector((state) => state.dataset.xScaleKey);
  const yScaleKey = useSelector((state) => state.dataset.yScaleKey);

  const svgRef = React.useRef(null);

  const { width, height, margin } = dimensions;
  const svgWidth = width + margin.left + margin.right;
  const svgHeight = height + margin.top + margin.bottom;

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
    <svg width={svgWidth} height={svgHeight} style={{ marginBottom: 300 }}>
      <g ref={svgRef} transform={`translate(${margin.left},${margin.top})`}>
        {dataset.map((d, i) => {
          const xVal = d[xScaleKey];
          const yVal = d[yScaleKey];
          if (!xVal) return;
          const fill = colorScale(xVal.toString());

          return useBars ? (
            <rect
              x={xScale(xVal.toString())}
              y={yScale(yVal)}
              width={xScale.bandwidth ? xScale.bandwidth() : 10}
              height={
                yScale.bandwidth ? yScale.bandwidth() : height - yScale(yVal)
              }
              style={{ opacity: 0.8 }}
              fill={fill}
              stroke="black"
              key={i}
            />
          ) : (
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

export const BarChart = memo(BarChartC);
