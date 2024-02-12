import React from "react";
import { Bar } from "@ant-design/charts";

const MedianBarPlot = ({ data }) => {
  // Extract unique features from the data
  const excludeKeys = ["quality", "is_user_submitted", "submit_date"];
  const features = Object.keys(data[0].fields).filter(
    (key) => !excludeKeys.includes(key)
  );

  const calculateMedian = (arr) => {
    const numericArr = arr.filter(
      (value) => typeof value === "number" && !isNaN(value)
    );

    // Check if there are valid numeric values
    if (numericArr.length === 0) {
      return 0; // You can adjust this default value if needed
    }

    // Sort the numeric array
    const sortedArr = numericArr.sort((a, b) => a - b);
    const mid = Math.floor(sortedArr.length / 2);

    if (sortedArr.length % 2 === 0) {
      return (sortedArr[mid - 1] + sortedArr[mid]) / 2;
    } else {
      return sortedArr[mid];
    }
  };

  const chartData = features.reduce((acc, feature) => {
    const quality0Data = data
      .filter(
        (entry) =>
          entry.fields &&
          typeof entry.fields[feature] === "number" &&
          !isNaN(entry.fields[feature]) &&
          entry.fields.quality === 0
      )
      .map((entry) => entry.fields[feature]);

    const quality1Data = data
      .filter(
        (entry) =>
          entry.fields &&
          typeof entry.fields[feature] === "number" &&
          !isNaN(entry.fields[feature]) &&
          entry.fields.quality === 1
      )
      .map((entry) => entry.fields[feature]);

    const medianQuality0 = calculateMedian(quality0Data);
    const medianQuality1 = calculateMedian(quality1Data);

    // Add data for each feature and quality level
    acc.push({ feature, quality: 0, median: medianQuality0 });
    acc.push({ feature, quality: 1, median: medianQuality1 });

    return acc;
  }, []);

  const config = {
    data: chartData,
    xField: "feature",
    yField: "median",
    seriesField: "quality",
    isGroup: true, // Separate bars for each quality level
    widthRatio: 1, // Make the bars 100% of the container width
    meta: {
      quality: {
        alias: "Quality",
        formatter: (value) => (value === 1 ? "Quality 1" : "Quality 0"),
      },
      median: { alias: "Median" },
    },
    label: {
      position: "top", // Use a valid position value
      layout: [{ type: "interval-adjust-position" }],
    },
  };

  return (
    <div>
      <h2>Median Bar Plot</h2>
      <div>
        <h3>Feature vs Median Quality</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <div style={{ marginLeft: "50px", width: "95%" }}>
            {/* Add width: "100%" to make it full width */}
            <Bar {...config} />
          </div>
        </div>
        <div style={{ textAlign: "center" }}>Median feature value by quality</div>
      </div>
    </div>
  );
};

export default MedianBarPlot;
