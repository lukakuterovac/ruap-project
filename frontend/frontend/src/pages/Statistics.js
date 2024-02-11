// Statistics.js
import axios from "axios";
import React, { useEffect, useState, useReducer } from "react";
import { Tabs } from "antd";
import Nav from "../components/Nav";
import IndividualAttributeGraphs from "./IndividualAttributeGraphs";
import ScatterPlot from "./ScatterPlot";
import MedianBarPlot from "../components/MedianBarPlot";

const { TabPane } = Tabs;

const items = [
  {
    key: "1",
    label: "Quality",
    children: "Content of Tab Pane 1",
  },
  {
    key: "2",
    label: "Size",
    children: "Content of Tab Pane 1",
  },
  {
    key: "3",
    label: "Weight",
    children: "Content of Tab Pane 2",
  },
  {
    key: "4",
    label: "Sweetness",
    children: "Content of Tab Pane 3",
  },
  {
    key: "5",
    label: "Crunchiness",
    children: "Content of Tab Pane 3",
  },
  {
    key: "6",
    label: "Juiciness",
    children: "Content of Tab Pane 3",
  },
  {
    key: "7",
    label: "Ripeness",
    children: "Content of Tab Pane 3",
  },
  {
    key: "8",
    label: "Acidity",
    children: "Content of Tab Pane 3",
  },
  {
    key: "9",
    label: "Scatter plot",
    children: "Content of Tab Pane 3",
  },
];

function Statistics() {
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState("1");
  const [applesData, setApplesData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Add forceUpdate
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    axios
      .get("/api/data")
      .then((response) => {
        setData(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("ERROR fetching data:", error);
        setLoading(false);
      });
  }, []);

  const getAttributeName = () => {
    if (!data) return "";

    switch (activeTab) {
      case "2":
        return "Size";
      case "3":
        return "Weight";
      case "4":
        return "Sweetness";
      case "5":
        return "Crunchiness";
      case "6":
        return "Juiciness";
      case "7":
        return "Ripeness";
      case "8":
        return "Acidity";
      default:
        return "";
    }
  };

  const getAttributeData = () => {
    if (!data) return [];

    switch (activeTab) {
      case "2":
        return data.map((apple) => apple.fields.size);
      case "3":
        return data.map((apple) => apple.fields.weight);
      case "4":
        return data.map((apple) => apple.fields.sweetness);
      case "5":
        return data.map((apple) => apple.fields.crunchiness);
      case "6":
        return data.map((apple) => apple.fields.juiciness);
      case "7":
        return data.map((apple) => apple.fields.ripeness);
      case "8":
        return data.map((apple) => apple.fields.acidity);
      default:
        return [];
    }
  };

  useEffect(() => {
    // Call forceUpdate when the tab becomes active
    forceUpdate();
  }, [activeTab]);

  const attributeName = getAttributeName();

  return (
    <div>
      <Nav />
      <Tabs defaultActiveKey={activeTab} onChange={setActiveTab}>
        {items.map((item) => (
          <TabPane tab={item.label} key={item.key}>
            {/* Add key prop for forceUpdate */}
            {item.key === "9" && activeTab === "9" ? (
              <ScatterPlot key={activeTab} />
            ) : item.key === "1" && activeTab === "1" ? (
              !loading && <MedianBarPlot key={activeTab} data={data} />
            ) : (
              !loading && (
                <IndividualAttributeGraphs
                  key={activeTab}
                  attribute1={getAttributeData()}
                  attribute2={data.map((apple) => apple.fields.quality)}
                  attributeName={attributeName}
                />
              )
            )}
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
}

export default Statistics;
