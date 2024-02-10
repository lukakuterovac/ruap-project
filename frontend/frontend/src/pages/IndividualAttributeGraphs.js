// IndividualAttributeGraphs.js
import React from "react";
import { Line, Column } from "@ant-design/charts";

const IndividualAttributeGraphs = ({ attribute1, attribute2 }) => {
  
  const applesData = attribute1.map((size, index) => ({
    fields: { size, quality: attribute2[index] },
  }));

  const validApples = applesData.filter(
    (apple) =>
      apple.fields &&
      apple.fields.size !== undefined &&
      apple.fields.quality !== undefined
  );

  const numIntervals = Math.ceil(validApples.length / 100);
  const intervals = [];

  const sizeDistribution = {
    small: 0,
    medium: 0,
    large: 0,
  };

  for (let i = 0; i < numIntervals; i++) {
    const sizeStart = i / numIntervals;
    const sizeEnd = (i + 1) / numIntervals;

    const applesInIntervalQuality0 = validApples.filter(
      (apple) =>
        apple.fields.size >= sizeStart &&
        apple.fields.size < sizeEnd &&
        apple.fields.quality === 0
    );

    const applesInIntervalQuality1 = validApples.filter(
      (apple) =>
        apple.fields.size >= sizeStart &&
        apple.fields.size < sizeEnd &&
        apple.fields.quality === 1
    );

    const applesInInterval = applesInIntervalQuality0.concat(
      applesInIntervalQuality1
    );

    const applesBySize = {
      small: 0,
      medium: 0,
      large: 0,
    };

    applesInInterval.forEach((apple) => {
      if (apple.fields.size < 0.33) {
        applesBySize.small += 1;
      } else if (apple.fields.size < 0.66) {
        applesBySize.medium += 1;
      } else {
        applesBySize.large += 1;
      }
    });

    sizeDistribution.small += applesBySize.small;
    sizeDistribution.medium += applesBySize.medium;
    sizeDistribution.large += applesBySize.large;

    intervals.push({
      interval: i + 1,
      0: applesInIntervalQuality0.length,
      1: applesInIntervalQuality1.length,
      ...applesBySize,
    });
  }

  const lineChartData = intervals;
  const barChartData = [
    { size: "Small", count: sizeDistribution.small },
    { size: "Medium", count: sizeDistribution.medium },
    { size: "Large", count: sizeDistribution.large },
  ];

  const lineChartConfig = {
    data: lineChartData,
    xField: "interval",
    yField: ["0", "1"],
    color: ["#1890FF", "#FF4D4F"],
    label: {},
    point: {},
    meta: {
      interval: { alias: "Intervals" },
      0: { alias: "Quality 0" },
      1: { alias: "Quality 1" },
    },
  };

  const barChartConfig = {
    data: barChartData,
    xField: "size",
    yField: "count",
    label: {},
    meta: {
      size: { alias: "Apple Size" },
      count: { alias: "Number of Apples" },
    },
  };

  return (
    <div>
      <h2>Apple Size and Quality Analysis</h2>
      <div>
        <h3>Apple Size and Quality Relationship</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <div style={{ marginBottom: "20px" }}>
            <div
              style={{
                textAlign: "center",
                writingMode: "vertical-lr",
                textOrientation: "sideways",
                transform: "rotateZ(180deg)",
              }}
            >
              Number of Apples
            </div>
          </div>
          <div style={{ marginLeft: "50px" }}>
            <Line {...lineChartConfig} />
          </div>
        </div>
        <div style={{ textAlign: "center" }}>10^2 Measure</div>
      </div>
      <div>
        <h3>Apple Size Distribution</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <div style={{ marginBottom: "20px", marginRight: "20px" }}>
            <div
              style={{
                textAlign: "center",
                writingMode: "vertical-lr",
                textOrientation: "sideways",
                transform: "rotateZ(180deg)",
              }}
            >
              Number of Apples
            </div>
          </div>
          <div>
            <Column {...barChartConfig} />
          </div>
        </div>
        <div style={{ textAlign: "center" }}>Apple Size</div>
      </div>
    </div>
  );
};

export default IndividualAttributeGraphs;
