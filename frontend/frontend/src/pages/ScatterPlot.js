import React, { useEffect, useState } from "react";
import axios from "axios";
import { Scatter } from "@ant-design/charts";
import { Spin } from "antd";
import IndividualAttributeGraphs from "./IndividualAttributeGraphs";

const ScatterPlot = () => {
  const [applesData, setApplesData] = useState([]);
  const [xAxisKey, setXAxisKey] = useState("");
  const [yAxisKey, setYAxisKey] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/data")
      .then((response) => {
        const applesData = response.data.data.filter(
          (apple) =>
            apple.fields &&
            apple.fields.size !== undefined &&
            apple.fields.quality !== undefined
        );

        setApplesData(applesData);

        // Set default X and Y axes to the first two input values
        const inputValues = Object.keys(applesData[0]?.fields || {})
          .filter(
            (field) =>
              field !== "quality" &&
              field !== "is_user_submitted" &&
              field !== "submit_date"
          )
          .slice(0, 2);

        setXAxisKey(inputValues[0] || "");
        setYAxisKey(inputValues[1] || "");
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error("ERROR fetching data:", error);
        setLoading(false); // Set loading to false in case of an error
      });
  }, []);

  const handleXAxisChange = (value) => {
    setXAxisKey(value);
  };

  const handleYAxisChange = (value) => {
    setYAxisKey(value);
  };

  const scatterConfig = {
    data: applesData.map((apple) => ({
      [xAxisKey]: apple.fields[xAxisKey],
      [yAxisKey]: apple.fields[yAxisKey],
      quality: apple.fields.quality,
    })),
    xField: xAxisKey,
    yField: yAxisKey,
    colorField: "quality",
    pointStyle: {
      fill: "white",
      stroke: "#5B8FF9",
      lineWidth: 2,
    },
  };

  return (
    <div>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Spin size="large" />
        </div>
      ) : (
        <div>
          <div>
            <label>X-Axis:</label>
            <select
              onChange={(e) => handleXAxisChange(e.target.value)}
              value={xAxisKey}
            >
              {Object.keys(applesData[0]?.fields || {})
                .filter(
                  (field) =>
                    field !== "quality" &&
                    field !== "is_user_submitted" &&
                    field !== "submit_date"
                )
                .map((field) => (
                  <option key={field} value={field}>
                    {field}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label>Y-Axis:</label>
            <select
              onChange={(e) => handleYAxisChange(e.target.value)}
              value={yAxisKey}
            >
              {Object.keys(applesData[0]?.fields || {})
                .filter(
                  (field) =>
                    field !== "quality" &&
                    field !== "is_user_submitted" &&
                    field !== "submit_date"
                )
                .map((field) => (
                  <option key={field} value={field}>
                    {field}
                  </option>
                ))}
            </select>
          </div>
          <Scatter {...scatterConfig} />
        </div>
      )}
    </div>
  );
};

export default ScatterPlot;
