import React, { useState } from 'react';
import { Button, Menu } from 'antd';
import {
  PieChartOutlined,
  SettingOutlined ,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { ConfigProvider, theme } from 'antd';

const customTheme2 = {
    ...theme, // Spread existing theme to keep defaults
    token: {
      ...theme.token, // Spread existing tokens to keep defaults
      colorPrimary: 'green',
      colorSecondary: 'white', // Replace with your desired color
    },
};


function getItem(label, key, icon, linkTo = '', children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
    linkTo,
  };
}

const items = [
  getItem('Home', '1', <HomeOutlined />, '/', undefined, 'route'),
  getItem('Predict', '2', <SettingOutlined  />, '/predict', undefined, 'route'),
  getItem('Statistics', '3', <PieChartOutlined  />, '/statistics', undefined, 'route'),
];

const Nav = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <ConfigProvider theme={customTheme2}>
        <div
        style={{
            width: 256,
            background: 'white',
        }}
        >
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
            theme="dark"
            inlineCollapsed={collapsed}
        >
            {items.map(item => {
            if (item.type === 'route') {
                return (
                <Menu.Item key={item.key} icon={item.icon}>
                    <Link to={item.linkTo}>{item.label}</Link>
                </Menu.Item>
                );
            }
            return (
                <Menu.SubMenu key={item.key} icon={item.icon} title={item.label}>
                {item.children.map(subItem => (
                    <Menu.Item key={subItem.key}>
                    <Link to={subItem.linkTo}>{subItem.label}</Link>
                    </Menu.Item>
                ))}
                </Menu.SubMenu>
            );
            })}
        </Menu>
        </div>
    </ConfigProvider>
  );
};

export default Nav;
