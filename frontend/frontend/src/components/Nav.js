import React, { useState } from 'react';
import { Button, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { MenuFoldOutlined, MenuUnfoldOutlined, HomeOutlined, SettingOutlined, PieChartOutlined } from '@ant-design/icons';

const Nav = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const items = [
    { label: 'Home', key: '1', icon: <HomeOutlined />, linkTo: '/' },
    { label: 'Predict', key: '2', icon: <SettingOutlined />, linkTo: '/predict' },
    { label: 'Statistics', key: '3', icon: <PieChartOutlined />, linkTo: '/statistics' },
  ];

  return (
    <div style={{ width: 256, background: 'white' }}>
      <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{
          marginBottom: 16,
        }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="light"  // Set theme to light
        inlineCollapsed={collapsed}
      >
        {items.map(item => (
          <Menu.Item key={item.key} icon={item.icon}>
            <Link to={item.linkTo}>{item.label}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </div>
  );
};

export default Nav;
