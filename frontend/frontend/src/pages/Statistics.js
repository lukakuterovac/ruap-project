import axios from "axios";
import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import Nav from "../components/Nav";
import IndividualAttributeGraphs from "./IndividualAttributeGraphs";

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
  const [activeTab, setActiveTab] = useState("1"); // Initial active tab is '1'
  const [applesData, setApplesData] = useState([]);
  const [loading, setLoading] = useState(true);

  const onChange = (key) => {
    console.log(key);
    setActiveTab(key);
  };

  useEffect(() => {
    // Make an Axios request to fetch data
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

  useEffect(() => {
    console.log(activeTab);
    console.log(getAttributeData());
  }, [activeTab]);

  // Function to filter and transform data based on the selected tab
  const getAttributeData = () => {
    if (!data) return [];

    switch (activeTab) {
      case "2": // Size
        return data.map((apple) => apple.fields.size);
      case "3": // Weight
        return data.map((apple) => apple.fields.weight);
      case "4": // Sweetness
        return data.map((apple) => apple.fields.sweetness);
      case "5": // Crunchiness
        return data.map((apple) => apple.fields.crunchiness);
      case "6": // Juiciness
        return data.map((apple) => apple.fields.juiciness);
      case "7": // Ripeness
        return data.map((apple) => apple.fields.ripeness);
      case "8": // Acidity
        return data.map((apple) => apple.fields.acidity);
      default:
        return [];
    }
  };

  return (
    <div>
      <Nav></Nav>
      <Tabs defaultActiveKey={activeTab} onChange={onChange}>
        {items.map((item) => (
          <TabPane tab={item.label} key={item.key}>
            {item.children}
          </TabPane>
        ))}
      </Tabs>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <IndividualAttributeGraphs
          attribute1={getAttributeData()} // Pass the relevant attribute data
          attribute2={data.map((apple) => apple.fields.quality)} // Always use 'quality' as attribute2
        />
      )}
    </div>
  );
}

export default Statistics;
