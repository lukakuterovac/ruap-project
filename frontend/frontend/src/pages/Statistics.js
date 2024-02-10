import axios from "axios";
import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import Nav from '../components/Nav';

const { TabPane } = Tabs;


const onChange = (key) => {
    console.log(key);
  };
  const items = [
    {
        key: '1',
        label: 'Quality',
        children: 'Content of Tab Pane 1',
    },
    {
        key: '2',
        label: 'Size',
        children: 'Content of Tab Pane 1',
    },
    {
        key: '3',
        label: 'Weight',
        children: 'Content of Tab Pane 2',
    },
    {
        key: '4',
        label: 'Sweetness',
        children: 'Content of Tab Pane 3',
    },
    {
        key: '5',
        label: 'Crunchiness',
        children: 'Content of Tab Pane 3',
    },
    {
        key: '6',
        label: 'Juiciness',
        children: 'Content of Tab Pane 3',
    },
    {
        key: '7',
        label: 'Ripeness',
        children: 'Content of Tab Pane 3',
    },
    {
        key: '8',
        label: 'Acidity',
        children: 'Content of Tab Pane 3',
    },
    {
        key: '9',
        label: 'Scatter plot',
        children: 'Content of Tab Pane 3',
    },
  ];

function Statistics(){
    const [data, setData] = useState(null);
    const [activeTab, setActiveTab] = useState('1'); // Initial active tab is '1'

    const onChange = (key) => {
        console.log(key);
        setActiveTab(key); // Update the active tab when it changes
    };

    return(
        <div>
            <Nav></Nav>
            <Tabs defaultActiveKey={activeTab} onChange={onChange}>
                {items.map(item => (
                <TabPane tab={item.label} key={item.key}>
                    {item.children}
                </TabPane>
                ))}
            </Tabs>
        </div>
    );
}

export default Statistics;