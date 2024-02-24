import React from 'react';

import { Layout, Menu } from 'antd';

const Header = () => {
  return (
    <Layout.Header
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div className="demo-logo">Employee Management Logo</div>

      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        style={{ flex: 1, minWidth: 0, }}
      />
    </Layout.Header>
  )
}

export default Header;